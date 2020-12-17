import { patronApi } from '@api/patrons';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchPatronDetails/IS_LOADING';
export const SUCCESS = 'fetchPatronDetails/SUCCESS';
export const HAS_ERROR = 'fetchPatronDetails/HAS_ERROR';

export const fetchPatronDetails = (patronPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await patronApi.get(patronPid);

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
