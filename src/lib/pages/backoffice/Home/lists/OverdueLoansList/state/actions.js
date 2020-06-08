import { invenioConfig } from '@config';
import { loanApi } from '@api/loans';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchOverdueLoans/IS_LOADING';
export const SUCCESS = 'fetchOverdueLoans/SUCCESS';
export const HAS_ERROR = 'fetchOverdueLoans/HAS_ERROR';

export const fetchOverdueLoans = () => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await loanApi.list(
        loanApi
          .query()
          .overdue()
          .withState(invenioConfig.circulation.loanActiveStates)
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
