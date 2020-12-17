import { documentApi } from '@api/documents';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchPendingOverdueDocuments/IS_LOADING';
export const SUCCESS = 'fetchPendingOverdueDocuments/SUCCESS';
export const HAS_ERROR = 'fetchPendingOverdueDocuments/HAS_ERROR';

export const fetchPendingOverdueDocuments = () => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await documentApi.list(
        documentApi.query().pendingOverdue().qs()
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
