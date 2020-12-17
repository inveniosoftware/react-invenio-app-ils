import { eItemApi } from '@api/eitems';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchDocumentEItems/IS_LOADING';
export const SUCCESS = 'fetchDocumentEItems/SUCCESS';
export const HAS_ERROR = 'fetchDocumentEItems/HAS_ERROR';

export const fetchDocumentEItems = (documentPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await eItemApi.list(
        eItemApi.query().withDocPid(documentPid).qs()
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
