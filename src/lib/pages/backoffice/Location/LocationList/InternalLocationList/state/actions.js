import { internalLocationApi } from '@api/locations';
import { searchReady } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
export const IS_LOADING = 'fetchInternalLocations/IS_LOADING';
export const SUCCESS = 'fetchInternalLocations/SUCCESS';
export const HAS_ERROR = 'fetchInternalLocations/HAS_ERROR';

export const DELETE_IS_LOADING = 'deleteInternalLocation/DELETE_IS_LOADING';
export const DELETE_SUCCESS = 'deleteInternalLocation/DELETE_SUCCESS';
export const DELETE_HAS_ERROR = 'deleteInternalLocation/DELETE_HAS_ERROR';

export const fetchInternalLocations = () => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await internalLocationApi.list();
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

export const deleteInternalLocation = ilocPid => {
  return async dispatch => {
    dispatch({
      type: DELETE_IS_LOADING,
    });

    try {
      await internalLocationApi.delete(ilocPid);
      await searchReady();
      dispatch({
        type: DELETE_SUCCESS,
        payload: { internalLocationPid: ilocPid },
      });
      dispatch(
        sendSuccessNotification(
          'Success!',
          `The internal location ${ilocPid} has been deleted.`
        )
      );
      dispatch(fetchInternalLocations());
    } catch (error) {
      dispatch({
        type: DELETE_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};
