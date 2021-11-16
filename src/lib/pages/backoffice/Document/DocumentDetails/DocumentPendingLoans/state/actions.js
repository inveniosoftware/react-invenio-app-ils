import { invenioConfig } from '@config';
import { loanApi } from '@api/loans';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchPendingLoansOnDocument/IS_LOADING';
export const SUCCESS = 'fetchPendingLoansOnDocument/SUCCESS';
export const HAS_ERROR = 'fetchPendingLoansOnDocument/HAS_ERROR';

export const fetchPendingLoans = (documentPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await loanApi.list(
        loanApi
          .query()
          .withDocPid(documentPid)
          .withState(invenioConfig.CIRCULATION.loanRequestStates)
          .sortByRequestStartDateAsc()
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
