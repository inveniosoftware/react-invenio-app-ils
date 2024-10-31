import React from 'react';
import { Link } from 'react-router-dom';
import { loanApi } from '@api/loans';
import {
  sendErrorNotification,
  sendSuccessNotification,
  sendWarningNotification,
} from '@components/Notifications';
import { FrontSiteRoutes } from '@routes/urls';

export const SEARCH_HAS_ERROR = 'selfCheckOut/SEARCH_HAS_ERROR';
export const SEARCH_IS_LOADING = 'selfCheckOut/SEARCH_IS_LOADING';
export const SEARCH_ITEM_SUCCESS = 'selfCheckOut/SEARCH_ITEM_SUCCESS';

export const notifyResultMessage = (message) => {
  return (dispatch) => {
    dispatch(sendWarningNotification(message));
  };
};

export const selfCheckOutSearch = (term) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_IS_LOADING,
    });

    try {
      const upperCasedTerm = term.toUpperCase();
      const response = await loanApi.doSelfCheckoutSearchItem(upperCasedTerm);
      const item = response.data || null;

      dispatch({
        type: SEARCH_ITEM_SUCCESS,
        payload: item,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const selfCheckOut = (documentPid, itemPid, patronPid) => {
  return async (dispatch) => {
    try {
      await loanApi.doSelfCheckout(documentPid, itemPid, patronPid);
      const linkToLoan = (
        <p>
          Self-checkout completed! You can view all your current loans on your{' '}
          <Link to={FrontSiteRoutes.patronProfile}>profile</Link> page.
        </p>
      );
      dispatch(sendSuccessNotification('Success!', linkToLoan));
    } catch (error) {
      dispatch(sendErrorNotification(error));
    }
  };
};
