import { sessionManager } from '@authentication/services/SessionManager';
import { loanApi } from '@api/loans';
import { toShortDate } from '@api/date';
import { DateTime } from 'luxon';

export const IS_LOADING = 'requestLoan/IS_LOADING';
export const SUCCESS = 'requestLoan/SUCCESS';
export const HAS_ERROR = 'requestLoan/HAS_ERROR';
export const INITIAL = 'requestLoan/INITIALIZE';

export const requestLoanForDocument = (
  documentPid,
  { requestEndDate = null, deliveryMethod = null } = {}
) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    const today = toShortDate(DateTime.local());

    try {
      const response = await loanApi.doRequest(
        documentPid,
        sessionManager.user.id,
        {
          requestExpireDate: requestEndDate,
          requestStartDate: today,
          deliveryMethod: deliveryMethod,
        }
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
    }
  };
};

export const initializeState = () => {
  return async dispatch => {
    dispatch({
      type: INITIAL,
    });
  };
};
