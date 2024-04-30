import React from 'react';
import { Link } from 'react-router-dom';
import { itemApi } from '@api/items';
import { loanApi } from '@api/loans';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import _first from 'lodash/first';
import { FrontSiteRoutes } from '@routes/urls';

export const IS_LOADING = 'selfCheckOut/IS_LOADING';
export const SUCCESS = 'fetchItemDetails/SUCCESS';
export const HAS_ERROR = 'fetchItemDetails/HAS_ERROR';

export const SEARCH_HAS_ERROR = 'selfCheckOut/SEARCH_HAS_ERROR';
export const SEARCH_IS_LOADING = 'selfCheckOut/SEARCH_IS_LOADING';
export const SEARCH_ITEM_SUCCESS = 'selfCheckOut/SEARCH_ITEM_SUCCESS';
export const UPDATE_RESULT_MESSAGE = 'selfCheckOut/UPDATE_RESULT_MESSAGE';

export const updateResultMessage = (message) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_RESULT_MESSAGE,
      payload: message,
    });
  };
};

const searchItem = async (dispatch, term) => {
  const response = await itemApi.list(itemApi.query().withBarcode(term).qs());
  const item = _first(response.data.hits);

  dispatch({
    type: SEARCH_ITEM_SUCCESS,
    payload: item,
  });

  return item;
};

export const selfCheckOutSearch = (term) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_IS_LOADING,
    });

    try {
      const item = await searchItem(dispatch, term);

      if (item === undefined) {
        dispatch({
          type: UPDATE_RESULT_MESSAGE,
          payload: `There is no book with barcode matching ${term}`,
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

export const checkoutItem = (
  documentPid,
  itemPid,
  patronPid,
  force = false
) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await loanApi.doCheckout(
        documentPid,
        itemPid,
        patronPid,
        { force: force }
      );
      const { pid } = response.data.metadata;
      const linkToLoan = (
        <p>
          The loan {pid} has been created by patron {patronPid}.{' '}
          <Link to={FrontSiteRoutes.patronProfile}>
            You can now view the loan details.
          </Link>
        </p>
      );
      dispatch(sendSuccessNotification('Success!', linkToLoan));
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};
