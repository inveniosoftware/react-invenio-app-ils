import { orderApi } from '@api/acquisition';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchOrderDetails/IS_LOADING';
export const SUCCESS = 'fetchOrderDetails/SUCCESS';
export const HAS_ERROR = 'fetchOrderDetails/HAS_ERROR';

export const fetchOrderDetails = pid => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await orderApi.get(pid);
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
