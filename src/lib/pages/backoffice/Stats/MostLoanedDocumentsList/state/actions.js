import { sendErrorNotification } from '@components/Notifications';
import { circulationStatsApi } from '@api/stats/circulationStats';

export const IS_LOADING = 'statsMostLoanedDocuments/IS_LOADING';
export const SUCCESS = 'statsMostLoanedDocuments/SUCCESS';
export const HAS_ERROR = 'statsMostLoanedDocuments/HAS_ERROR';

export const fetchMostLoanedDocuments = (fromDate, toDate) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await circulationStatsApi.getMostLoanedDocuments(
        fromDate,
        toDate
      );
      await dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      await dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      await dispatch(sendErrorNotification(error));
    }
  };
};
