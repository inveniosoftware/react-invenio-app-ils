import { documentApi } from '@api/documents';

export const IS_LOADING = 'fetchDocumentsDetails/IS_LOADING';
export const SUCCESS = 'fetchDocumentsDetails/SUCCESS';
export const HAS_ERROR = 'fetchDocumentsDetails/HAS_ERROR';
export const SHOW_TAB = 'fetchDocumentsDetails/SHOW_TAB';

export const fetchDocumentsDetails = documentPid => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    await documentApi
      .get(documentPid)
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
      });
  };
};

export const showTab = activeIndex => {
  return async dispatch => {
    dispatch({
      type: SHOW_TAB,
      payload: activeIndex,
    });
  };
};
