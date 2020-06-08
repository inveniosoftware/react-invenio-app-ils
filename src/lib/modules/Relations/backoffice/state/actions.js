import { recordToPidType } from '@api/utils';
import { documentApi } from '@api/documents';
import { seriesApi } from '@api/series';
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '@components/Notifications';

export const IS_LOADING = 'recordRelations/IS_LOADING';
export const SUCCESS = 'recordRelations/SUCCESS';
export const HAS_ERROR = 'recordRelations/HAS_ERROR';

const getRecordApi = referrerRecord => {
  if (recordToPidType(referrerRecord) === 'docid') {
    return documentApi;
  } else if (recordToPidType(referrerRecord) === 'serid') {
    return seriesApi;
  } else {
    throw TypeError('Invalid record type to create a relation.');
  }
};

export const createRelations = (
  referrerRecord,
  selections,
  relationType,
  extra = {}
) => {
  return async dispatch => {
    if (selections.length) {
      dispatch({
        type: IS_LOADING,
      });
      try {
        const response = await getRecordApi(referrerRecord).createRelation(
          referrerRecord,
          selections,
          relationType,
          extra
        );
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

export const deleteRelation = (referrer, related) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await getRecordApi(referrer).deleteRelation(
        referrer,
        related
      );
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
