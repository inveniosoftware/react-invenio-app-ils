import { documentRequestApi } from '@api/documentRequests/documentRequest';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';

export const IS_LOADING = 'declineDocumentRequest/IS_LOADING';
export const SUCCESS = 'declineDocumentRequest/SUCCESS';
export const HAS_ERROR = 'declineDocumentRequest/HAS_ERROR';

export const declineRequest = (pid, data) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const resp = await documentRequestApi.decline(pid, data);
      dispatch({
        type: SUCCESS,
        payload: resp.data,
      });
      dispatch(
        sendSuccessNotification('Success!', `Request ${pid} has been declined.`)
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
