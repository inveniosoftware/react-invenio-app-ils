import { loanApi } from '@api/loans';
import { listQuery } from './listQuery';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchRenewedLoans/IS_LOADING';
export const SUCCESS = 'fetchRenewedLoans/SUCCESS';
export const HAS_ERROR = 'fetchRenewedLoans/HAS_ERROR';

export const fetchRenewedLoans = () => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await loanApi.list(listQuery);

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
