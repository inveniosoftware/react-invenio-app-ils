import { documentApi } from '@api/documents';
import { userApi } from '@api/users/user';
import { sessionManager } from '@authentication/services/SessionManager';

export const IS_LOADING = 'fetchDocumentsDetails/IS_LOADING';
export const SUCCESS = 'fetchDocumentsDetails/SUCCESS';
export const HAS_ERROR = 'fetchDocumentsDetails/HAS_ERROR';
export const SHOW_TAB = 'fetchDocumentsDetails/SHOW_TAB';

export const fetchDocumentsDetails = (documentPid, fetchLoansInfo = false) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await documentApi.get(documentPid);
      const loansResponse =
        fetchLoansInfo && sessionManager.isAuthenticated()
          ? await userApi.loans(documentPid)
          : null;
      dispatch({
        type: SUCCESS,
        payload: response.data,
        loansPayload: loansResponse ? loansResponse.data : null,
      });
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
    }
  };
};

export const showTab = (activeIndex) => {
  return async (dispatch) => {
    dispatch({
      type: SHOW_TAB,
      payload: activeIndex,
    });
  };
};
