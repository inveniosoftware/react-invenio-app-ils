import { documentRequestApi } from '@api/documentRequests/documentRequest';
import { invenioConfig } from '@config';

export const IS_LOADING = 'fetchPatronDocumentRequests/IS_LOADING';
export const SUCCESS = 'fetchPatronDocumentRequests/SUCCESS';
export const HAS_ERROR = 'fetchPatronDocumentRequests/HAS_ERROR';

const selectQuery = (patronPid, page, size) => {
  return documentRequestApi
    .query()
    .withPatronPid(patronPid)
    .withState('PENDING')
    .withPage(page)
    .withSize(size)
    .sortByNewest()
    .qs();
};

export const fetchPatronDocumentRequests = (
  patronPid,
  { page = 1, size = invenioConfig.APP.DEFAULT_RESULTS_SIZE } = {}
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
    }
  };
};
