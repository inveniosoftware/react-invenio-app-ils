import { borrowingRequestApi } from '@api/ill';
import { searchReady } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import { SUCCESS as FETCH_SUCCESS } from '../../state/actions';

export const SUCCESS = 'borrowingRequestLoanExtensionAction/SUCCESS';
export const IS_LOADING = 'borrowingRequestLoanExtensionAction/IS_LOADING';
export const HAS_ERROR = 'borrowingRequestLoanExtensionAction/HAS_ERROR';
export const borrowingRequestLoanExtensionAccept = (
  borrowingRequestPid,
  loanEndDate
) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await borrowingRequestApi.acceptExtension(
        borrowingRequestPid,
        loanEndDate
      );
      await searchReady();
      dispatch({
        type: SUCCESS,
      });
      // the response contains the updated borrowing request,
      // push it to the fetch redux action to re-render the component
      dispatch({
        type: FETCH_SUCCESS,
        payload: response.data,
      });
      dispatch(
        sendSuccessNotification('Success!', 'The loan has been extended.')
      );
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      sendErrorNotification(error);
    }
  };
};

export const borrowingRequestLoanExtensionDecline = borrowingRequestPid => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await borrowingRequestApi.declineExtension(
        borrowingRequestPid
      );
      await searchReady();
      dispatch({
        type: SUCCESS,
      });
      // the response contains the updated borrowing request,
      // push it to the fetch redux action to re-render the component
      dispatch({
        type: FETCH_SUCCESS,
        payload: response.data,
      });
      dispatch(
        sendSuccessNotification('Success!', 'The loan has been declined.')
      );
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      sendErrorNotification(error);
    }
  };
};
