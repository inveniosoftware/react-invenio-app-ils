import { borrowingRequestApi } from '@api/ill';

export const IS_LOADING = 'fetchBorrowingRequestDetails/IS_LOADING';
export const SUCCESS = 'fetchBorrowingRequestDetails/SUCCESS';
export const HAS_ERROR = 'fetchBorrowingRequestDetails/HAS_ERROR';

export const fetchBorrowingRequestDetails = borrowingRequestPid => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await borrowingRequestApi.get(borrowingRequestPid);
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
