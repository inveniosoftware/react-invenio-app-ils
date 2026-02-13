import { loanApi } from '@api/loans';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import { fetchLoanDetails } from '@modules/Loan/actions';
export const IS_LOADING = 'overdueLoanSendNotificationModal/IS_LOADING';
export const SUCCESS = 'overdueLoanSendNotificationModal/SUCCESS';
export const HAS_ERROR = 'overdueLoanSendNotificationModal/HAS_ERROR';

export const sendOverdueLoansNotificationReminder = (loanPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response =
        await loanApi.sendOverdueLoansNotificationReminder(loanPid);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
      dispatch(fetchLoanDetails(response.data.metadata.pid));
      dispatch(
        sendSuccessNotification(
          'Success!',
          'A notification is on its way to the user.'
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
