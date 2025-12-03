import { providerApi } from '@api/providers';
import { searchReady } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import { goTo } from '@history';
import { ProviderRoutes } from '@routes/urls';
export const IS_LOADING = 'fetchProviderDetails/IS_LOADING';
export const SUCCESS = 'fetchProviderDetails/SUCCESS';
export const HAS_ERROR = 'fetchProviderDetails/HAS_ERROR';

export const DELETE_IS_LOADING = 'deleteProvider/DELETE_IS_LOADING';
export const DELETE_SUCCESS = 'deleteProvider/DELETE_SUCCESS';
export const DELETE_HAS_ERROR = 'deleteProvider/DELETE_HAS_ERROR';

export const CLEAR = 'fetchProviderDetails/CLEAR';

export const fetchProviderDetails = (pid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await providerApi.get(pid);
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

export const deleteProvider = (pid) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_IS_LOADING,
    });

    try {
      await providerApi.delete(pid);
      await searchReady();
      dispatch({
        type: DELETE_SUCCESS,
        payload: { pid: pid },
      });
      dispatch(
        sendSuccessNotification(
          'Success!',
          `The provider ${pid} has been deleted.`
        )
      );
      goTo(ProviderRoutes.providersList);
    } catch (error) {
      dispatch({
        type: DELETE_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const clearProviderDetails = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR,
    });
  };
};
