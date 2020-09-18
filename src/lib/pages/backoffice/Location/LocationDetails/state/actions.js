import { locationApi } from '@api/locations/location';
import { delay } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';

export const IS_LOADING = 'fetchLocationDetails/IS_LOADING';
export const SUCCESS = 'fetchLocationDetails/SUCCESS';
export const HAS_ERROR = 'fetchLocationDetails/HAS_ERROR';

export const DELETE_IS_LOADING = 'deleteLocation/DELETE_IS_LOADING';
export const DELETE_SUCCESS = 'deleteLocation/DELETE_SUCCESS';
export const DELETE_HAS_ERROR = 'deleteLocation/DELETE_HAS_ERROR';

export const fetchLocationDetails = pid => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await locationApi.get(pid);
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

export const deleteLocation = pid => {
  return async dispatch => {
    dispatch({
      type: DELETE_IS_LOADING,
    });
    try {
      await locationApi.delete(pid);
      await delay();
      dispatch({
        type: DELETE_SUCCESS,
        payload: { pid: pid },
      });
      dispatch(
        sendSuccessNotification(
          'Success!',
          `The location ${pid} has been deleted.`
        )
      );
      goTo(BackOfficeRoutes.locationsList);
    } catch (error) {
      dispatch({
        type: DELETE_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};
