import { borrowingRequestApi } from '@api/ill';
import { sendErrorNotification } from '@components/Notifications';
import { invenioConfig } from '@config';

export const IS_LOADING = 'fetchPatronPastBorrowingRequests/IS_LOADING';
export const SUCCESS = 'fetchPatronPastBorrowingRequests/SUCCESS';
export const HAS_ERROR = 'fetchPatronPastBorrowingRequests/HAS_ERROR';

const selectQuery = (patronPid, page = 1, size) => {
  return borrowingRequestApi
    .query()
    .withPatron(patronPid)
    .withState(invenioConfig.ILL_BORROWING_REQUESTS.completedStatuses)
    .withSize(size)
    .withPage(page)
    .qs();
};

export const fetchPatronPastBorrowingRequests = (
  patronPid,
  page,
  size = invenioConfig.APP.defaultResultsSize
) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await borrowingRequestApi.list(
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
