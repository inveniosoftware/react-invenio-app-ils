import { documentApi } from '@api/documents';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchRequestedWithAvailableItems/IS_LOADING';
export const SUCCESS = 'fetchRequestedWithAvailableItems/SUCCESS';
export const HAS_ERROR = 'fetchRequestedWithAvailableItems/HAS_ERROR';

export const fetchRequestedWithAvailableItems = () => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await documentApi.count(
        documentApi
          .query()
          .withAvailableItems()
          .withPendingLoans()
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
