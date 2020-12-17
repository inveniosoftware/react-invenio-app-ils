import { documentRequestApi } from '@api/documentRequests';
import { searchReady } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
export const IS_LOADING = 'fetchDocumentRequestDetails/IS_LOADING';
export const SUCCESS = 'fetchDocumentRequestDetails/SUCCESS';
export const HAS_ERROR = 'fetchDocumentRequestDetails/HAS_ERROR';

export const DELETE_IS_LOADING = 'deleteDocumentRequest/DELETE_IS_LOADING';
export const DELETE_SUCCESS = 'deleteDocumentRequest/DELETE_SUCCESS';
export const DELETE_HAS_ERROR = 'deleteDocumentRequest/DELETE_HAS_ERROR';

export const fetchDocumentRequestDetails = (documentRequestPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await documentRequestApi.get(documentRequestPid);
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

export const deleteRequest = (requestPid) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_IS_LOADING,
    });

    try {
      await documentRequestApi.delete(requestPid);
      await searchReady();
      dispatch({
        type: DELETE_SUCCESS,
        payload: { requestPid: requestPid },
      });
      dispatch(
        sendSuccessNotification(
          'Success!',
          `Document request ${requestPid} has been deleted.`
        )
      );
      goTo(BackOfficeRoutes.documentRequestsList);
    } catch (error) {
      dispatch({
        type: DELETE_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const acceptRequest = (pid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const resp = await documentRequestApi.accept(pid);
      dispatch({
        type: SUCCESS,
        payload: resp.data,
      });
      dispatch(
        sendSuccessNotification('Success!', `Request ${pid} has been accepted.`)
      );
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const rejectRequest = (pid, data) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const resp = await documentRequestApi.reject(pid, data);
      dispatch({
        type: SUCCESS,
        payload: resp.data,
      });
      dispatch(
        sendSuccessNotification('Success!', `Request ${pid} has been rejected.`)
      );
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const addProvider = (provDataPid, pid, pidType) => {
  return async (dispatch) => {
    try {
      const response = await documentRequestApi.addProvider(pid, {
        physical_item_provider: {
          pid: provDataPid,
          pid_type: pidType,
        },
      });
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

export const addDocument = (pid, key) => {
  return async (dispatch) => {
    try {
      const response = await documentRequestApi.addDocument(pid, {
        document_pid: key,
      });
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

export const removeProvider = (pid, provPid) => {
  return async (dispatch) => {
    try {
      const response = await documentRequestApi.removeProvider(pid, {
        physical_item_provider_pid: provPid,
      });
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

export const removeDocument = (pid, documentPid) => {
  return async (dispatch) => {
    try {
      const response = await documentRequestApi.removeDocument(pid, {
        document_pid: documentPid,
      });
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
