import { loanApi } from '@api/loans';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';

export const IS_LOADING = 'overdueLoanSendMailModal/IS_LOADING';
export const SUCCESS = 'overdueLoanSendMailModal/SUCCESS';
export const HAS_ERROR = 'overdueLoanSendMailModal/HAS_ERROR';

export const sendOverdueLoansMailReminder = (loanPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await loanApi.sendOverdueLoansMailReminder(loanPid);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
      dispatch(
        sendSuccessNotification(
          'Success!',
          'An email is on its way to the user.'
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
