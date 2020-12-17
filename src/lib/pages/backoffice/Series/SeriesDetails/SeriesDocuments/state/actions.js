import { documentApi } from '@api/documents';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchSeriesDocuments/IS_LOADING';
export const SUCCESS = 'fetchSeriesDocuments/SUCCESS';
export const HAS_ERROR = 'fetchSeriesDocuments/HAS_ERROR';

export const fetchSeriesDocuments = (seriesPid, moi) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await documentApi.list(
        documentApi.query().withSeriesPid(seriesPid, moi).qs()
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
