import { loanApi } from '@api/loans';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import { fetchLoanDetails } from '@modules/Loan/actions';
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
      dispatch(fetchLoanDetails(response.data.metadata.pid));
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
