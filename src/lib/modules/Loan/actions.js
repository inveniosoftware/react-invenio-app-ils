import { loanApi } from '@api';
import {
  sendSuccessNotification,
  sendErrorNotification,
} from '@components/Notifications';

export const IS_LOADING = 'loanAction/IS_LOADING';
export const SUCCESS = 'loanAction/SUCCESS';
export const HAS_ERROR = 'loanAction/HAS_ERROR';

export const performLoanAction = (
  actionURL,
  documentPid,
  patronPid,
  { itemPid = null, cancelReason = null } = {}
) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
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
      dispatch({
        type: SUCCESS,
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
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};
