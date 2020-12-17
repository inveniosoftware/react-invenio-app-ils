import { loanApi } from '@api/loans';
import { sendErrorNotification } from '@components/Notifications';
import { invenioConfig } from '@config';

export const IS_LOADING = 'fetchDocumentStats/IS_LOADING';
export const SUCCESS = 'fetchDocumentStats/SUCCESS';
export const HAS_ERROR = 'fetchDocumentStats/HAS_ERROR';

export const fetchDocumentStats = ({ documentPid, fromDate, toDate }) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await loanApi.list(
        loanApi
          .query()
          .withDocPid(documentPid)
          .withState(invenioConfig.CIRCULATION.loanCompletedStates)
          .withStartDate({
            fromDate: fromDate,
            toDate: toDate,
          })
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
