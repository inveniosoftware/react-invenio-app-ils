import { seriesApi } from '@api/series';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchSeriesMultipartMonographs/IS_LOADING';
export const SUCCESS = 'fetchSeriesMultipartMonographs/SUCCESS';
export const HAS_ERROR = 'fetchSeriesMultipartMonographs/HAS_ERROR';

export const fetchSeriesMultipartMonographs = (seriesPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await seriesApi.list(
        seriesApi
          .query()
          .withModeOfIssuance('MULTIPART_MONOGRAPH')
          .withSerialPid(seriesPid)
          .qs()
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
