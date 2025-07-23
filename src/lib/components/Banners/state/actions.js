import { bannerApi } from '@api/banners';

export const BANNER_RESET = 'fetchBanners/RESET';
export const BANNER_SUCCESS = 'fetchBanners/SUCCESS';
export const BANNER_HAS_ERROR = 'fetchBanners/HAS_ERROR';

export const resetBanners = () => {
  return async (dispatch) =>
    dispatch({
      type: BANNER_RESET,
    });
};

export const fetchBanners = () => {
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
