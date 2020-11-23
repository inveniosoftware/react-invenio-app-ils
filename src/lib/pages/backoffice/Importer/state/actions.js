import { http } from '@api/base';

export const IS_LOADING = 'importer/IS_LOADING';
export const SUCCESS = 'importer/SUCCESS';
export const HAS_ERROR = 'importer/HAS_ERROR';

const importerURL = '/importer';
const headers = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const postData = formData => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await http.post(`${importerURL}`, formData, headers);
      await dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      await dispatch({
        type: HAS_ERROR,
        payload: error,
      });
    }
  };
};
