import { itemApi } from '@api/items';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchDocumentItems/IS_LOADING';
export const SUCCESS = 'fetchDocumentItems/SUCCESS';
export const HAS_ERROR = 'fetchDocumentItems/HAS_ERROR';

export const fetchDocumentItems = (documentPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await itemApi.list(
        itemApi.query().withDocPid(documentPid).qs()
      );
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};
