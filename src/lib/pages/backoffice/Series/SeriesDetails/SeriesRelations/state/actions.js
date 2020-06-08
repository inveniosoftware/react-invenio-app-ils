import { seriesApi } from '@api/series';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';

export const IS_LOADING = 'seriesRelations/IS_LOADING';
export const SUCCESS = 'seriesRelations/SUCCESS';
export const HAS_ERROR = 'seriesRelations/HAS_ERROR';

export const createRelations = (pid, relations) => {
  return async dispatch => {
    if (relations.length) {
      dispatch({
        type: IS_LOADING,
      });

      try {
        const response = await seriesApi.createRelation(pid, relations);

        dispatch({
          type: SUCCESS,
          payload: response.data.metadata.relations,
        });
        dispatch(
          sendSuccessNotification(
            'Success!',
            'Relations were successfully added.'
          )
        );
      } catch (error) {
        dispatch({
          type: HAS_ERROR,
          payload: error,
        });
        dispatch(sendErrorNotification(error));
      }
    }
  };
};

export const deleteRelation = (pid, relation) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await seriesApi.deleteRelation(pid, relation);

      dispatch({
        type: SUCCESS,
        payload: response.data.metadata.relations,
      });
      dispatch(
        sendSuccessNotification('Success!', 'Relation successfully removed.')
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
