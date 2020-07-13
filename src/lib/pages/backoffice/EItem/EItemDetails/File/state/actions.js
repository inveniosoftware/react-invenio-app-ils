import { eItemApi } from '@api/eitems/eitem';
import { fileApi } from '@api/files/file';
import { sendErrorNotification } from '@components/Notifications';
import {
  DELETE_FILE,
  UPLOAD_IS_LOADING,
} from '@pages/backoffice/EItem/EItemDetails/state/actions';
import { fetchEItemDetails } from './../../state/actions';

export const HAS_ERROR = 'upload/HAS_ERROR';
export const SUCCESS = 'upload/SUCCESS';
export const IS_LOADING = 'upload/IS_LOADING';

export const uploadFile = (eitemPid, bucket, file) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      if (!bucket) {
        const bucketResponse = await eItemApi.bucket(eitemPid);
        bucket = bucketResponse.data.metadata.bucket_id;
      }
      const response = await fileApi.upload(bucket, file);
      dispatch(fetchEItemDetails(eitemPid));
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

export const deleteFile = (bucket, filename) => {
  return async dispatch => {
    dispatch({
      type: UPLOAD_IS_LOADING,
    });

    try {
      await fileApi.delete(bucket, filename);
      dispatch({
        type: DELETE_FILE,
        payload: filename,
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
