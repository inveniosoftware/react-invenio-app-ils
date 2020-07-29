import { userApi } from '@api/users/user';

export const IS_LOADING = 'getUserLoans/IS_LOADING';
export const SUCCESS = 'getUserLoans/SUCCESS';
export const HAS_ERROR = 'getUserLoans/HAS_ERROR';
export const INITIAL = 'getUserLoans/INITIALIZE';

export const getUserLoans = documentPid => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await userApi.loans(documentPid);

      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
    }
  };
};
