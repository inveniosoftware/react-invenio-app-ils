import { itemApi } from '@api/items';
import { sendErrorNotification } from '@components/Notifications';
import { checkoutItem } from '../../ItemsCheckout/state/actions';
import _isEmpty from 'lodash/isEmpty';
import { recordToPidType } from '@api/utils';
import {
  IS_LOADING,
  SUCCESS,
  HAS_ERROR,
  QUERY_STRING_UPDATE,
  CLEAR_SEARCH,
} from './types';

export const fetchAndCheckoutIfOne = (barcode, patronPid, onSuccess) => {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING,
    });

    try {
      const response = await itemApi.list(
        itemApi.query().withBarcode(barcode).qs()
      );

      dispatch({
        type: SUCCESS,
        payload: response.data,
      });

      const ableToAutoCheckout =
        patronPid && hitAvailableForCheckout(response.data.hits);

      if (ableToAutoCheckout) {
        const itemToCheckout = response.data.hits[0];
        const documentPid = itemToCheckout.metadata.document.pid;
        const itemPid = {
          type: recordToPidType(itemToCheckout),
          value: itemToCheckout.metadata.pid,
        };
        dispatch(checkoutItem(documentPid, itemPid, patronPid, true));
        onSuccess();
      }
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};

export const updateQueryString = (queryString) => {
  return (dispatch) => {
    dispatch({
      type: QUERY_STRING_UPDATE,
      queryString: queryString,
    });
  };
};

export const clearResults = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_SEARCH,
    });
  };
};

const hitAvailableForCheckout = (hits) =>
  !_isEmpty(hits) &&
  hits.length === 1 &&
  hits[0].metadata.status === 'CAN_CIRCULATE';
