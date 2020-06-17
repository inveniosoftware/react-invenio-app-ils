import { loanApi } from '@api/loans';
import { delay } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';

export const ACTION_IS_LOADING = 'loanAction/IS_LOADING';
export const ACTION_SUCCESS = 'loanAction/SUCCESS';
export const ACTION_HAS_ERROR = 'loanAction/HAS_ERROR';

export const DETAILS_IS_LOADING = 'fetchLoanDetails/IS_LOADING';
export const DETAILS_SUCCESS = 'fetchLoanDetails/SUCCESS';
export const DETAILS_HAS_ERROR = 'fetchLoanDetails/HAS_ERROR';

export const fetchLoanDetails = loanPid => {
  return async dispatch => {
    dispatch({
      type: DETAILS_IS_LOADING,
    });
    try {
      const response = await loanApi.get(loanPid);
      dispatch({
        type: DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: DETAILS_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const performLoanAction = (
  actionURL,
  documentPid,
  patronPid,
  { itemPid = null, cancelReason = null } = {}
) => {
  return async dispatch => {
    dispatch({
      type: ACTION_IS_LOADING,
    });
    try {
      const response = await loanApi.doAction(
        actionURL,
        documentPid,
        patronPid,
        {
          itemPid: itemPid,
          cancelReason: cancelReason,
        }
      );
      await delay();

      dispatch({
        type: ACTION_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: DETAILS_SUCCESS,
        payload: response.data,
      });

      const loanPid = response.data.pid;
      dispatch(
        sendSuccessNotification(
          'Successful loan action!',
          `The loan action was successful for loan PID ${loanPid}.`
        )
      );
    } catch (error) {
      dispatch({
        type: ACTION_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};
