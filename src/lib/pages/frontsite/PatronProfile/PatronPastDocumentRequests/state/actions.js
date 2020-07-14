import { documentRequestApi } from '@api/documentRequests';
import { sendErrorNotification } from '@components/Notifications';
import { invenioConfig } from '@config';

export const IS_LOADING = 'fetchPatronPastDocumentRequests/IS_LOADING';
export const SUCCESS = 'fetchPatronPastDocumentRequests/SUCCESS';
export const HAS_ERROR = 'fetchPatronPastDocumentRequests/HAS_ERROR';

const selectQuery = (patronPid, page, size) => {
  return documentRequestApi
    .query()
    .withPatronPid(patronPid)
    .withPage(page)
    .withSize(size)
    .sortByNewest()
    .withState(['ACCEPTED', 'REJECTED'])
    .qs();
};

export const fetchPatronPastDocumentRequests = (
  patronPid,
  { page = 1, size = invenioConfig.APP.defaultResultsSize } = {}
) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await documentRequestApi.list(
        selectQuery(patronPid, page, size)
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
