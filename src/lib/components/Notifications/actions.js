import { isAPIError, shouldShowErrorPage } from '@components/Error/Error';

export const ADD = 'notifications/ADD';
export const REMOVE = 'notifications/REMOVE';
export const CLEAR_ALL = 'notifications/CLEAR_ALL';

export const sendErrorNotification = (error) => {
  return (dispatch) => {
    if (shouldShowErrorPage(error)) {
      // Don't send a notification if the error code has a dedicated page
      return;
    }
    if (isAPIError(error)) {
      const errorData = error.response.data;
      const { error_module: errorModule, message } = errorData;

      const title = errorModule ? `${errorModule}` : 'Something went wrong';
      dispatch(addNotification(title, message, 'error'));
    } else {
      dispatch(addNotification('Something went wrong', error.message, 'error'));
    }
  };
};

export const sendSuccessNotification = (title, content) => {
  return addNotification(title, content, 'success');
};

export const sendWarningNotification = (title, content) => {
  return addNotification(title, content, 'warning');
};

export const addNotification = (title, content, type) => {
  return {
    type: ADD,
    payload: {
      type: type,
      title: title,
      content: content,
    },
  };
};

export const clearNotifications = () => {
  return {
    type: CLEAR_ALL,
  };
};
