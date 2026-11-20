/*
 * SPDX-FileCopyrightText: 2020-2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import { itemApi } from '@api/items';
import { loanApi } from '@api/loans';
import { patronApi } from '@api/patrons';
import { recordToPidType } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';

export const CLEAR_RESULTS = 'checkOutSearch/CLEAR_RESULTS';
export const SEARCH_HAS_ERROR = 'checkOutSearch/SEARCH_HAS_ERROR';
export const SEARCH_IS_LOADING = 'checkOutSearch/SEARCH_IS_LOADING';
export const SEARCH_ITEM_SUCCESS = 'checkOutSearch/SEARCH_ITEM_SUCCESS  ';
export const SEARCH_PATRON_SUCCESS = 'checkOutSearch/SEARCH_PATRON_SUCCESS  ';
export const UPDATE_RESULT_MESSAGE = 'checkOutSearch/UPDATE_RESULT_MESSAGE';
export const ADD_TO_CHECKOUT_LIST = 'checkOutSearch/ADD_TO_CHECKOUT_LIST';
export const REMOVE_FROM_CHECKOUT_LIST =
  'checkOutSearch/REMOVE_FROM_CHECKOUT_LIST';
export const CHECKOUT_LIST_IS_LOADING =
  'checkOutSearch/CHECKOUT_LIST_IS_LOADING';
export const CHECKOUT_LIST_DONE = 'checkOutSearch/CHECKOUT_LIST_DONE';

export const updateResultMessage = (message) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_RESULT_MESSAGE,
      payload: message,
    });
  };
};

export const clearResults = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_RESULTS,
    });
  };
};

const searchPatrons = async (dispatch, term) => {
  const response = await patronApi.list(
    patronApi
      .query()
      .withPid(term, true)
      .withEmail(term)
      .withName(term, true)
      .withCustomField(term)
      .qs(),
    false
  );
  dispatch({
    type: SEARCH_PATRON_SUCCESS,
    payload: response.data.hits,
  });

  return response.data.hits;
};

const searchItems = async (dispatch, term) => {
  const response = await itemApi.list(itemApi.query().withBarcode(term).qs());

  dispatch({
    type: SEARCH_ITEM_SUCCESS,
    payload: response.data.hits,
  });

  return response.data.hits;
};

export const checkOutSearch = (term, onSuccess = () => {}) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_IS_LOADING,
    });
    let patrons = [];
    let items = [];

    try {
      patrons = await searchPatrons(dispatch, term);
      if (patrons.length === 1) {
        return goTo(BackOfficeRoutes.patronDetailsFor(patrons[0].metadata.pid));
      }

      items = await searchItems(dispatch, term);
      if (items.length === 1) {
        // fetch the record directly: the search index may have a stale
        // circulation state, e.g. not yet reindexed after a new loan
        const response = await itemApi.get(items[0].metadata.pid);
        dispatch({ type: ADD_TO_CHECKOUT_LIST, payload: response.data });
        return onSuccess();
      }

      if (items.length === 0 && patrons.length === 0) {
        dispatch({
          type: UPDATE_RESULT_MESSAGE,
          payload: `There is no patron with id/email, or physical copy with barcode matching ${term}`,
        });
      }
    } catch (error) {
      dispatch({
        type: SEARCH_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const removeFromCheckOutList = (itemPid) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_FROM_CHECKOUT_LIST, payload: itemPid });
  };
};

export const checkOutItems = (items, patronPid) => {
  return async (dispatch) => {
    dispatch({ type: CHECKOUT_LIST_IS_LOADING });
    const checkedOutPids = [];
    for (const item of items) {
      try {
        await loanApi.doCheckout(
          item.metadata.document_pid,
          { type: recordToPidType(item), value: item.metadata.pid },
          patronPid
        );
        checkedOutPids.push(item.metadata.pid);
      } catch (error) {
        dispatch(sendErrorNotification(error));
      }
    }
    dispatch({ type: CHECKOUT_LIST_DONE, payload: checkedOutPids });
    if (checkedOutPids.length > 0) {
      dispatch(
        sendSuccessNotification(
          'Success!',
          `${checkedOutPids.length} of ${items.length} physical copies checked out on behalf of patron ${patronPid}.`
        )
      );
    }
  };
};
