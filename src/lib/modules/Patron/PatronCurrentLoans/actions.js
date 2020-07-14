import { loanApi } from '@api/loans';
import { sendErrorNotification } from '@components/Notifications';
import { invenioConfig } from '@config';

export const IS_LOADING = 'fetchPatronCurrentLoans/IS_LOADING';
export const SUCCESS = 'fetchPatronCurrentLoans/SUCCESS';
export const HAS_ERROR = 'fetchPatronCurrentLoans/HAS_ERROR';

const selectQuery = (patronPid, page, size) => {
  return loanApi
    .query()
    .withPatronPid(patronPid)
    .withState(invenioConfig.CIRCULATION.loanActiveStates)
    .withPage(page)
    .withSize(size)
    .sortByNewest()
    .qs();
};

export const fetchPatronCurrentLoans = (
  patronPid,
  { page = 1, size = invenioConfig.APP.defaultResultsSize } = {}
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
