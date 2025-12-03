import { seriesApi } from '@api/series';
import { searchReady } from '@api/utils';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
export const IS_LOADING = 'fetchSeriesDetails/IS_LOADING';
export const SUCCESS = 'fetchSeriesDetails/SUCCESS';
export const HAS_ERROR = 'fetchSeriesDetails/HAS_ERROR';
export const CLEAR = 'fetchSeriesDetails/CLEAR';

export const DELETE_IS_LOADING = 'deleteSeries/DELETE_IS_LOADING';
export const DELETE_SUCCESS = 'deleteSeries/DELETE_SUCCESS';
export const DELETE_HAS_ERROR = 'deleteSeries/DELETE_HAS_ERROR';

export const deleteSeries = (seriesPid) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_IS_LOADING,
    });

    try {
      await seriesApi.delete(seriesPid);
      await searchReady();
      dispatch({
        type: DELETE_SUCCESS,
        payload: { seriesPid: seriesPid },
      });
      dispatch(
        sendSuccessNotification(
          'Success!',
          `The series ${seriesPid} has been deleted.`
        )
      );
      goTo(BackOfficeRoutes.seriesList);
    } catch (error) {
      dispatch({
        type: DELETE_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const fetchSeriesDetails = (seriesPid) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await seriesApi.get(seriesPid);

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

export const clearSeriesDetails = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR,
    });
  };
};
