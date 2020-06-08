import { loanApi } from '@api/loans';
import { invenioConfig } from '@config';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchPastLoans/IS_LOADING';
export const SUCCESS = 'fetchPastLoans/SUCCESS';
export const HAS_ERROR = 'fetchPastLoans/HAS_ERROR';

export const fetchPastLoans = itemPid => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    const loanStates = invenioConfig.circulation.loanCompletedStates;
    try {
      const response = await loanApi.list(
        loanApi
          .query()
          .withItemPid(itemPid)
          .withState(loanStates)
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
