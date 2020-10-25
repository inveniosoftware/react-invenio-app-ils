import { borrowingRequestApi } from '@api/ill';
import { sendErrorNotification } from '@components/Notifications';
import { invenioConfig } from '@config';
import _difference from 'lodash/difference';

export const IS_LOADING = 'fetchPatronCurrentBorrowingRequests/IS_LOADING';
export const SUCCESS = 'fetchPatronCurrentBorrowingRequests/SUCCESS';
export const HAS_ERROR = 'fetchPatronCurrentBorrowingRequests/HAS_ERROR';

const selectQuery = (patronPid, page = 1, size) => {
  const illConfig = invenioConfig.ILL_BORROWING_REQUESTS;
  const statuses = _difference(
    illConfig.orderedValidStatuses,
    illConfig.completedStatuses
  );
  return borrowingRequestApi
    .query()
    .withPatron(patronPid)
    .withState(statuses)
    .withSize(size)
    .withPage(page)
    .qs();
};

export const fetchPatronCurrentBorrowingRequests = (
  patronPid,
  page,
  size = invenioConfig.APP.DEFAULT_RESULTS_SIZE
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
