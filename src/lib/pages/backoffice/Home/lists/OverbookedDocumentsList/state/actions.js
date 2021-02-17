import { documentApi } from '@api/documents';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchOverbookedDocuments/IS_LOADING';
export const SUCCESS = 'fetchOverbookedDocuments/SUCCESS';
export const HAS_ERROR = 'fetchOverbookedDocuments/HAS_ERROR';

export const fetchOverbookedDocuments = () => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await documentApi.list(
        documentApi.query().overbooked().sortBy('-loan_requests').qs()
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
