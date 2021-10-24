import { loanApi } from '@api/loans';
import { searchReady } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import {
  fetchPatronCurrentLoans,
  IS_LOADING as currentLoansIsLoading,
} from '../PatronCurrentLoans/actions';
import _isEmpty from 'lodash/isEmpty';

export const IS_LOADING = 'bulkLoanExtend/IS_LOADING';
export const SUCCESS = 'bulkLoanExtend/SUCCESS';
export const HAS_ERROR = 'bulkLoanExtend/HAS_ERROR';

export const bulkLoanExtension = (patronPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await loanApi.bulkExtendLoans(patronPid);

      let successMessage = `${response.data.extended_loans.length} 
            loan(s) have been successfully extended.`;

      if (!_isEmpty(response.data.extended_loans)) {
        dispatch(sendSuccessNotification('Extension success', successMessage));
        dispatch({
          type: currentLoansIsLoading,
        });
        await searchReady();
        dispatch(fetchPatronCurrentLoans(patronPid));
      } else {
        let msg = 'There was no loans eligible for an extension.';

        dispatch(sendSuccessNotification('No loans extended', msg));
      }
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
