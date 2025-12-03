import { itemApi } from '@api/items';
import { loanApi } from '@api/loans';
import { searchReady } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
import React from 'react';
import { Link } from 'react-router-dom';
export const IS_LOADING = 'fetchItemDetails/IS_LOADING';
export const SUCCESS = 'fetchItemDetails/SUCCESS';
export const HAS_ERROR = 'fetchItemDetails/HAS_ERROR';
export const CLEAR = 'fetchItemDetails/CLEAR';

export const DELETE_IS_LOADING = 'deleteItem/DELETE_IS_LOADING';
export const DELETE_SUCCESS = 'deleteItem/DELETE_SUCCESS';
export const DELETE_HAS_ERROR = 'deleteItem/DELETE_HAS_ERROR';

export const fetchItemDetails = (itemPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await itemApi.get(itemPid);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const deleteItem = (itemPid) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_IS_LOADING,
    });

    try {
      await itemApi.delete(itemPid);
      await searchReady();
      dispatch({
        type: DELETE_SUCCESS,
        payload: { itemPid: itemPid },
      });
      dispatch(
        sendSuccessNotification(
          'Success!',
          `The item ${itemPid} has been deleted.`
        )
      );
      goTo(BackOfficeRoutes.itemsList);
    } catch (error) {
      dispatch({
        type: DELETE_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const clearItemDetails = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR,
    });
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
      await searchReady();
      const { pid } = response.data.metadata;
      const linkToLoan = (
        <p>
          The loan {pid} has been created on behalf of patron {patronPid}.{' '}
          <Link to={BackOfficeRoutes.loanDetailsFor(pid)}>
            You can now view the loan details.
          </Link>
        </p>
      );
      dispatch(sendSuccessNotification('Success!', linkToLoan));
      dispatch(fetchItemDetails(itemPid.value));
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};
