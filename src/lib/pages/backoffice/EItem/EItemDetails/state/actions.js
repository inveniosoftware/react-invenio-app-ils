import { eItemApi } from '@api/eitems';
import { searchReady } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';

export const IS_LOADING = 'fetchEItemDetails/IS_LOADING';
export const SUCCESS = 'fetchEItemDetails/SUCCESS';
export const HAS_ERROR = 'fetchEItemDetails/HAS_ERROR';
export const CLEAR = 'fetchEItemDetails/CLEAR';

export const DELETE_IS_LOADING = 'fetchEItemDetails/DELETE_IS_LOADING';
export const DELETE_SUCCESS = 'fetchEItemDetails/DELETE_SUCCESS';
export const DELETE_HAS_ERROR = 'fetchEItemDetails/DELETE_HAS_ERROR';

export const ADD_FILE = 'fetchEItemDetails/ADD_FILE';
export const DELETE_FILE = 'fetchEItemDetails/DELETE_FILE';
export const UPLOAD_IS_LOADING = 'fetchEItemDetails/UPLOAD_IS_LOADING';

export const clearEItemDetails = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR,
    });
  };
};

export const deleteEItem = (eitemPid) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_IS_LOADING,
    });

    try {
      await eItemApi.delete(eitemPid);
      await searchReady();
      dispatch({
        type: DELETE_SUCCESS,
        payload: { eitemPid: eitemPid },
      });
      dispatch(
        sendSuccessNotification(
          'Success!',
          `The E-Item ${eitemPid} has been deleted.`
        )
      );
      goTo(BackOfficeRoutes.eitemsList);
    } catch (error) {
      dispatch({
        type: DELETE_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const fetchEItemDetails = (eitemPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await eItemApi.get(eitemPid);
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
