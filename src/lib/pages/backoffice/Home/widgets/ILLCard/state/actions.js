import { borrowingRequestApi } from '@api/ill';
import { sendErrorNotification } from '@components/Notifications';
import { invenioConfig } from '@config';

export const IS_LOADING = 'fetchOngoingILLRequests/IS_LOADING';
export const SUCCESS = 'fetchOngoingILLRequests/SUCCESS';
export const HAS_ERROR = 'fetchOngoingILLRequests/HAS_ERROR';

export const fetchOngoingILLRequests = () => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await borrowingRequestApi.count(
        borrowingRequestApi
          .query()
          .withState(
            `(${invenioConfig.ILL_BORROWING_REQUESTS.requestedStatuses.join(
              ' OR '
            )})`
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
