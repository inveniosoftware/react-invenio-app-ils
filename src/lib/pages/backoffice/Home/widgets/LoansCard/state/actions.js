import { loanApi } from '@api/loans';
import { sendErrorNotification } from '@components/Notifications';
import { invenioConfig } from '@config';

export const IS_LOADING = 'fetchAllPendingLoans/IS_LOADING';
export const SUCCESS = 'fetchAllPendingLoans/SUCCESS';
export const HAS_ERROR = 'fetchAllPendingLoans/HAS_ERROR';

export const fetchPendingLoans = () => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await loanApi.count(
        loanApi
          .query()
          .withState(invenioConfig.circulation.loanRequestStates)
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
