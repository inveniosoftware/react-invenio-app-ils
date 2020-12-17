import { borrowingRequestApi } from '@api/ill';
import { sendErrorNotification } from '@components/Notifications';
import { invenioConfig } from '@config';

export const IS_LOADING =
  'fetchILLsPendingPatronLoanExtensionRequests/IS_LOADING';
export const SUCCESS = 'fetchILLsPendingPatronLoanExtensionRequests/SUCCESS';
export const HAS_ERROR =
  'fetchILLsPendingPatronLoanExtensionRequests/HAS_ERROR';

export const fetchPendingILLPatronLoanExtensions = () => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await borrowingRequestApi.list(
        borrowingRequestApi
          .query()
          .withState(invenioConfig.ILL_BORROWING_REQUESTS.activeStatuses)
          .withPatronLoanExtensionStatus(
            invenioConfig.ILL_BORROWING_REQUESTS.extensionPendingStatuses
          )
          .qs()
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
