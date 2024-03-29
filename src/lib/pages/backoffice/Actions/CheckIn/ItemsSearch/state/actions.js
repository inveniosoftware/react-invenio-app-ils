import { itemApi } from '@api/items';
import { loanApi } from '@api/loans';
import {
  addNotification,
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';

export const LOAN_IS_LOADING = 'itemLoansSearch/IS_LOADING';
export const LOAN_SUCCESS = 'itemLoansSearch/SUCCESS';
export const LOAN_HAS_ERROR = 'itemLoansSearch/HAS_ERROR';
export const MULTIPLE_LOAN_RESULTS = 'itemLoansSearch/MULTIPLE_LOAN_RESULTS';
export const CHECKIN_IS_LOADING = 'itemCheckin/IS_LOADING';
export const CHECKIN_SUCCESS = 'itemCheckin/SUCCESS';
export const CHECKIN_HAS_ERROR = 'itemCheckin/HAS_ERROR';
export const CLEAR = 'itemCheckin/CLEAR';

export const checkin = (barcode, onSuccess) => {
  return async (dispatch) => {
    dispatch({
      type: LOAN_IS_LOADING,
    });

    try {
      const response = await loanApi.list(
        loanApi.query().withItemBarcode(barcode).withState('ITEM_ON_LOAN').qs()
      );

      if (response.data.hits.length > 1) {
        dispatch({
          type: MULTIPLE_LOAN_RESULTS,
          payload: response.data,
        });
      } else {
        const metadata = response.data.hits[0].metadata;
        const checkinUrl = response.data.hits[0].availableActions.checkin;

        dispatch(
          checkInLoan(
            checkinUrl,
            metadata.document_pid,
            metadata.patron_pid,
            metadata.item_pid
          )
        );
        dispatch({
          type: LOAN_SUCCESS,
          payload: response.data,
        });
      }
      onSuccess();
    } catch (error) {
      if (!error.response) {
        dispatch(
          addNotification(
            'Error',
            `No item or no loan for barcode ${barcode}`,
            'error'
          )
        );
      }
      dispatch({
        type: LOAN_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const checkInLoan = (checkinUrl, documentPid, patronPid, itemPid) => {
  return async (dispatch) => {
    dispatch({
      type: CHECKIN_IS_LOADING,
    });
    try {
      await loanApi.doAction(checkinUrl, documentPid, patronPid, {
        itemPid: itemPid,
      });

      dispatch(
        sendSuccessNotification('Success!', `Item ${itemPid.value} returned.`)
      );

      let response = await itemApi.get(itemPid.value);
      const hasLoanRequests =
        (
          await loanApi.count(
            loanApi.query().withDocPid(documentPid).withState('PENDING').qs()
          )
        ).data > 0;

      response.data.has_pending_loans = hasLoanRequests;

      dispatch({
        type: CHECKIN_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CHECKIN_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const clearResults = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR,
    });
  };
};
