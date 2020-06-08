import { documentRequestApi } from '@api/documentRequests';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchPatronPastDocumentRequests/IS_LOADING';
export const SUCCESS = 'fetchPatronPastDocumentRequests/SUCCESS';
export const HAS_ERROR = 'fetchPatronPastDocumentRequests/HAS_ERROR';

const selectQuery = (patronPid, page) => {
  return documentRequestApi
    .query()
    .withPatronPid(patronPid)
    .withPage(page)
    .sortByNewest()
    .withState(['ACCEPTED', 'REJECTED'])
    .qs();
};

export const fetchPatronPastDocumentRequests = (
  patronPid,
  { page = 1 } = {}
) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await documentRequestApi.list(
        selectQuery(patronPid, page)
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
