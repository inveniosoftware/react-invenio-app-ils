import { invenioConfig } from '@config';
import { loanApi } from '@api/loans';
import { DateTime } from 'luxon';
import { toShortDate } from '@api/date';
import { sendErrorNotification } from '@components/Notifications';

export const IS_LOADING = 'fetchIdleLoans/IS_LOADING';
export const SUCCESS = 'fetchIdleLoans/SUCCESS';
export const HAS_ERROR = 'fetchIdleLoans/HAS_ERROR';

export const fetchIdlePendingLoans = () => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await loanApi.list(
        loanApi
          .query()
          .withState(invenioConfig.CIRCULATION.loanRequestStates)
          .withUpdated({
            to: toShortDate(DateTime.local().minus({ days: 10 })),
          })
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
