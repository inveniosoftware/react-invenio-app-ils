import { vendorApi } from '@api/acquisition';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';

export const IS_LOADING = 'fetchVendorDetails/IS_LOADING';
export const SUCCESS = 'fetchVendorDetails/SUCCESS';
export const HAS_ERROR = 'fetchVendorDetails/HAS_ERROR';

export const DELETE_IS_LOADING = 'deleteVendor/DELETE_IS_LOADING';
export const DELETE_SUCCESS = 'deleteVendor/DELETE_SUCCESS';
export const DELETE_HAS_ERROR = 'deleteVendor/DELETE_HAS_ERROR';

export const fetchVendorDetails = (pid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await vendorApi.get(pid);
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

export const deleteVendor = (pid) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_IS_LOADING,
    });

    try {
      await vendorApi.delete(pid);
      dispatch({
        type: DELETE_SUCCESS,
        payload: { pid: pid },
      });
      dispatch(
        sendSuccessNotification(
          'Success!',
          `The vendor ${pid} has been deleted.`
        )
      );
    } catch (error) {
      dispatch({
        type: DELETE_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};
