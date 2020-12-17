import { seriesApi } from '@api/series';

export const IS_LOADING = 'fetchSeriesDetails/IS_LOADING';
export const SUCCESS = 'fetchSeriesDetails/SUCCESS';
export const HAS_ERROR = 'fetchSeriesDetails/HAS_ERROR';

export const fetchSeriesDetails = (pid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await seriesApi.get(pid);
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
