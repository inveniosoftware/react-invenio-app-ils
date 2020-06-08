import { documentRequestApi } from '@api/documentRequests';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchPatronDocumentRequests/IS_LOADING';
export const SUCCESS = 'fetchPatronDocumentRequests/SUCCESS';
export const HAS_ERROR = 'fetchPatronDocumentRequests/HAS_ERROR';

const selectQuery = (patronPid, page = 1) => {
  return documentRequestApi
    .query()
    .withPatronPid(patronPid)
    .withPage(page)
    .sortByNewest()
    .qs();
};

export const fetchPatronDocumentRequests = (patronPid, page) => {
  const query = selectQuery(patronPid, page);
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await documentRequestApi.list(query);
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
