import { pageApi } from '@api/staticPages/page';

export const IS_LOADING = 'fetchStaticPage/IS_LOADING';
export const SUCCESS = 'fetchStaticPage/SUCCESS';
export const HAS_ERROR = 'fetchStaticPage/HAS_ERROR';

export const fetchStaticPageDetails = (pageID) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await pageApi.get(pageID);
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
