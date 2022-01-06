import { loanApi } from '@api/loans';
import { searchReady } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import {
  fetchPatronCurrentLoans,
  IS_LOADING as CURRENT_LOANS_IS_LOADING,
} from '@modules/Patron/PatronCurrentLoans/actions';
import {
  fetchPatronPendingLoans,
  IS_LOADING as PENDING_LOANS_IS_LOADING,
} from '@modules/Patron/PatronPendingLoans/actions';
import { CLEAR_SEARCH } from '../../ItemsSearch/state/types';
export const IS_LOADING = 'patronItemCheckout/IS_LOADING';
export const SUCCESS = 'patronItemCheckout/SUCCESS';
export const HAS_ERROR = 'patronItemCheckout/ERROR';

export const checkoutItem = (
  documentPid,
  itemPid,
  patronPid,
  force = false
) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await loanApi.doCheckout(
        documentPid,
        itemPid,
        patronPid,
        { force: force }
      );
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
      dispatch({
        type: CLEAR_SEARCH,
      });
      // put the current loans into loading state until ES updates
      dispatch({
        type: CURRENT_LOANS_IS_LOADING,
      });
      dispatch({
        type: PENDING_LOANS_IS_LOADING,
      });
      await searchReady();
      dispatch(fetchPatronCurrentLoans(patronPid));
      dispatch(fetchPatronPendingLoans(patronPid));
      dispatch(
        sendSuccessNotification(
          'Loan Created',
          'The new loan was successfully created.'
        )
      );
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};
