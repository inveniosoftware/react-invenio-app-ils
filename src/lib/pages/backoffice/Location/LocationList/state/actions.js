import { locationApi } from '@api/locations/location';
import { delay } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';

export const IS_LOADING = 'fetchAllLocations/IS_LOADING';
export const SUCCESS = 'fetchAllLocations/SUCCESS';
export const HAS_ERROR = 'fetchAllLocations/HAS_ERROR';

export const DELETE_IS_LOADING = 'deleteLocation/DELETE_IS_LOADING';
export const DELETE_SUCCESS = 'deleteLocation/DELETE_SUCCESS';
export const DELETE_HAS_ERROR = 'deleteLocation/DELETE_HAS_ERROR';

export const fetchAllLocations = () => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await locationApi.list();
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

export const deleteLocation = locationPid => {
  return async dispatch => {
    dispatch({
      type: DELETE_IS_LOADING,
    });
    try {
      await locationApi.delete(locationPid);
      await delay();
      dispatch({
        type: DELETE_SUCCESS,
        payload: { locationPid: locationPid },
      });
      dispatch(
        sendSuccessNotification(
          'Success!',
          `The location ${locationPid} has been deleted.`
        )
      );
      dispatch(fetchAllLocations());
    } catch (error) {
      dispatch({
        type: DELETE_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};
