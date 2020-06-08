import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchReferences/IS_LOADING';
export const SUCCESS = 'fetchReferences/SUCCESS';
export const HAS_ERROR = 'fetchReferences/HAS_ERROR';

export const fetchReferences = promiseArray => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const responses = await Promise.all(promiseArray);
      dispatch({
        type: SUCCESS,
        payload: responses.map(resp => resp.data),
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
