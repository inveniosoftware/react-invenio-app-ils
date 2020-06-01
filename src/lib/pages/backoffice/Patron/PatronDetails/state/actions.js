import { IS_LOADING, SUCCESS, HAS_ERROR } from './types';
import { patronApi } from '@api/patrons';
import { sendErrorNotification } from '@components/Notifications';

export const fetchPatronDetails = patronPid => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    await patronApi
      .get(patronPid)
      .then(response => {
        dispatch({
          type: SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: HAS_ERROR,
          payload: error,
        });
        dispatch(sendErrorNotification(error));
      });
  };
};
