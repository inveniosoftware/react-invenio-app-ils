import { documentRequestApi } from '@api/documentRequests/documentRequest';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';

export const IS_LOADING = 'rejectDocumentRequest/IS_LOADING';
export const SUCCESS = 'rejectDocumentRequest/SUCCESS';
export const HAS_ERROR = 'rejectDocumentRequest/HAS_ERROR';

export const rejectRequest = (pid, data) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const resp = await documentRequestApi.reject(pid, data);
      dispatch({
        type: SUCCESS,
        payload: resp.data,
      });
      dispatch(
        sendSuccessNotification('Success!', `Request ${pid} has been rejected.`)
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
