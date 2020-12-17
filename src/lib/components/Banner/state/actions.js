import { bannerApi } from '@api/banners';

export const BANNER_RESET = 'fetchBanner/RESET';
export const BANNER_SUCCESS = 'fetchBanner/SUCCESS';
export const BANNER_HAS_ERROR = 'fetchBanner/HAS_ERROR';

export const resetBanner = () => {
  return async (dispatch) =>
    dispatch({
      type: BANNER_RESET,
    });
};

export const fetchBanner = () => {
  return async (dispatch) => {
    try {
      const response = await bannerApi.getActive();
      dispatch({
        type: BANNER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: BANNER_HAS_ERROR,
        payload: error,
      });
    }
  };
};
