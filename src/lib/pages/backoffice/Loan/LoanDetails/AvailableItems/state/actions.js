import { itemApi } from '@api/items';
import { loanApi } from '@api/loans';
import { searchReady } from '@api/utils';
import { sendErrorNotification } from '@components/Notifications';
import { invenioConfig } from '@config';
import {
  DETAILS_IS_LOADING as FETCH_LOAN_IS_LOADING,
  DETAILS_SUCCESS as FETCH_LOAN_SUCCESS,
} from '@modules/Loan/actions';

export const IS_LOADING = 'fetchAvailableItems/IS_LOADING';
export const SUCCESS = 'fetchAvailableItems/SUCCESS';
export const HAS_ERROR = 'fetchAvailableItems/HAS_ERROR';
export const fetchAvailableItems = documentPid => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await itemApi.list(
        itemApi
          .query()
          .withDocPid(documentPid)
          .withStatus(invenioConfig.ITEMS.canCirculateStatuses)
          .availableForCheckout()
          .qs()
      );

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

export const assignItemToLoan = (itemId, loanId) => {
  return async dispatch => {
    dispatch({
      type: FETCH_LOAN_IS_LOADING,
    });

    try {
      const response = await loanApi.assignItemToLoan(itemId, loanId);
      await searchReady();

      dispatch({
        type: FETCH_LOAN_SUCCESS,
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
