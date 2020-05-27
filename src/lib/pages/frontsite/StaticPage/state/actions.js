import { IS_LOADING, SUCCESS, HAS_ERROR } from './types';
import { pageApi } from '@api';

export const fetchStaticPageDetails = pageID => {
  return async dispatch => {
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
