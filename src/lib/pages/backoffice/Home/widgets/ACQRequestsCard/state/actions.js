import { orderApi } from '@api/acquisition';
import { sendErrorNotification } from '@components/Notifications';
import { invenioConfig } from '@config';

export const IS_LOADING = 'fetchOngoingAcqRequests/IS_LOADING';
export const SUCCESS = 'fetchOngoingAcqRequests/SUCCESS';
export const HAS_ERROR = 'fetchOngoingAcqRequests/HAS_ERROR';

export const fetchOngoingAcqRequests = () => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await orderApi.count(
        orderApi
          .query()
          .withState(
            `(${invenioConfig.ACQ_ORDERS.orderedStatuses.join(' OR ')})`
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
