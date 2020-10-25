import { loanApi } from '@api/loans';
import { sendErrorNotification } from '@components/Notifications';
import { invenioConfig } from '@config';

export const IS_LOADING = 'fetchPatronPendingLoans/IS_LOADING';
export const SUCCESS = 'fetchPatronPendingLoans/SUCCESS';
export const HAS_ERROR = 'fetchPatronPendingLoans/HAS_ERROR';
export const CHANGE_SORT_BY = 'patronPendingLoansChangeSortBy/CHANGE_SORT_BY';

const selectQuery = (patronPid, page, size) => {
  return loanApi
    .query()
    .withPatronPid(patronPid)
    .withState(invenioConfig.CIRCULATION.loanRequestStates)
    .withSize(size)
    .withPage(page)
    .sortByNewest()
    .qs();
};

export const fetchPatronPendingLoans = (
  patronPid,
  { page = 1, size = invenioConfig.APP.DEFAULT_RESULTS_SIZE } = {}
) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await loanApi.list(selectQuery(patronPid, page, size));
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
