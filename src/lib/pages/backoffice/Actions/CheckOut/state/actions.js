/*
 * SPDX-FileCopyrightText: 2020-2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import { itemApi } from '@api/items';
import { patronApi } from '@api/patrons';
import { recordToPidType } from '@api/utils';
import {
  addNotification,
  sendErrorNotification,
  sendSuccessNotification,
  sendWarningNotification,
} from '@components/Notifications';
import { goTo } from '@history';
import { checkOutItem, getCheckOutIssue } from '@modules/Items/backoffice';
import { BackOfficeRoutes } from '@routes/urls';
import _get from 'lodash/get';
import _lowerFirst from 'lodash/lowerFirst';
import _upperFirst from 'lodash/upperFirst';
import React from 'react';
import { List } from 'semantic-ui-react';

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

const describeItem = (item) =>
  `${_get(item, 'metadata.document.title')} (${item.metadata.barcode})`;

/**
 * Show one entry as plain text, several as a bulleted list so that they can
 * be read quickly before the notification is dismissed.
 */
const renderEntries = (entries) =>
  entries.length === 1 ? entries[0] : <List bulleted items={entries} />;

export const checkOutItems = (items, patronPid, patronName) => {
  return async (dispatch) => {
    dispatch({ type: CHECKOUT_LIST_IS_LOADING });
    const checkedOut = [];
    const checkedOutWithChanges = [];
    const failed = [];

    for (const item of items) {
      const issue = getCheckOutIssue(item);
      if (issue && !issue.canCheckOut) {
        failed.push({ item, reason: `skipped, ${_lowerFirst(issue.text)}` });
        continue;
      }
      try {
        const { changes } = await checkOutItem(
          item.metadata.document_pid,
          { type: recordToPidType(item), value: item.metadata.pid },
          patronPid
        );
        if (changes.length > 0) {
          checkedOutWithChanges.push({ item, changes });
        } else {
          checkedOut.push(item);
        }
      } catch (error) {
        const reason = _get(error, 'response.data.message', error.message);
        failed.push({ item, reason });
      }
    }

    dispatch({
      type: CHECKOUT_LIST_DONE,
      payload: [
        ...checkedOut,
        ...checkedOutWithChanges.map(({ item }) => item),
      ].map((item) => item.metadata.pid),
    });

    const patron = `${patronName} (patron ${patronPid})`;
    if (checkedOut.length > 0) {
      dispatch(
        sendSuccessNotification(
          `Checked out to ${patron} (${checkedOut.length} of ${items.length})`,
          renderEntries(checkedOut.map(describeItem))
        )
      );
    }
    if (checkedOutWithChanges.length > 0) {
      dispatch(
        sendWarningNotification(
          `Checked out to ${patron}, with changes (${checkedOutWithChanges.length} of ${items.length})`,
          renderEntries(
            checkedOutWithChanges.map(
              ({ item, changes }) =>
                `${describeItem(item)}: ${_upperFirst(changes.join('; '))}.`
            )
          )
        )
      );
    }
    if (failed.length > 0) {
      dispatch(
        addNotification(
          `Not checked out (${failed.length} of ${items.length})`,
          renderEntries(
            failed.map(({ item, reason }) => `${describeItem(item)}: ${reason}`)
          ),
          'error'
        )
      );
    }
  };
};
