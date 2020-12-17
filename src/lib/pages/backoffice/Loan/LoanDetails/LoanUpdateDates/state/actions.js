import { loanApi } from '@api/loans';
import { fetchLoanDetails } from '@modules/Loan/actions';

export const IS_LOADING = 'updateLoanDates/IS_LOADING';
export const SUCCESS = 'updateLoanDates/SUCCESS';
export const HAS_ERROR = 'updateLoanDates/HAS_ERROR';
export const CLEAR = 'updateLoanDates/CLEAR';

export const loanUpdateDates = (pid, data) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const resp = await loanApi.updateDates(pid, data);
      dispatch({
        type: SUCCESS,
        payload: resp.data,
      });
      dispatch(fetchLoanDetails(resp.data.metadata.pid, true));
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
    }
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR,
    });
  };
};
