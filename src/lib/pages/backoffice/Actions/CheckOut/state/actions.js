import { itemApi } from '@api/items';
import { patronApi } from '@api/patrons';
import { sendErrorNotification } from '@components/Notifications';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';

export const CLEAR_RESULTS = 'checkOutSearch/CLEAR_RESULTS';
export const SEARCH_HAS_ERROR = 'checkOutSearch/SEARCH_HAS_ERROR';
export const SEARCH_IS_LOADING = 'checkOutSearch/SEARCH_IS_LOADING';
export const SEARCH_ITEM_SUCCESS = 'checkOutSearch/SEARCH_ITEM_SUCCESS  ';
export const SEARCH_PATRON_SUCCESS = 'checkOutSearch/SEARCH_PATRON_SUCCESS  ';
export const UPDATE_RESULT_MESSAGE = 'checkOutSearch/UPDATE_RESULT_MESSAGE';

export const updateResultMessage = (message) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_RESULT_MESSAGE,
      payload: message,
    });
  };
};

export const clearResults = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_RESULTS,
    });
  };
};

const searchPatrons = async (dispatch, term) => {
  const response = await patronApi.list(
    patronApi
      .query()
      .withPid(term, true)
      .withEmail(term)
      .withName(term, true)
      .withCustomField(term)
      .qs(),
    false
  );
  dispatch({
    type: SEARCH_PATRON_SUCCESS,
    payload: response.data.hits,
  });

  return response.data.hits;
};

const searchItems = async (dispatch, term) => {
  const response = await itemApi.list(itemApi.query().withBarcode(term).qs());

  dispatch({
    type: SEARCH_ITEM_SUCCESS,
    payload: response.data.hits,
  });

  return response.data.hits;
};

export const checkOutSearch = (term) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_IS_LOADING,
    });
    let patrons = [];
    let items = [];

    try {
      patrons = await searchPatrons(dispatch, term);
      if (patrons.length === 1) {
        return goTo(BackOfficeRoutes.patronDetailsFor(patrons[0].metadata.pid));
      }

      items = await searchItems(dispatch, term);
      if (items.length === 1) {
        return goTo(BackOfficeRoutes.itemDetailsFor(items[0].metadata.pid));
      }

      if (items.length === 0 && patrons.length === 0) {
        dispatch({
          type: UPDATE_RESULT_MESSAGE,
          payload: `There is no patron with id/email, or physical copy with barcode matching ${term}`,
        });
      }
    } catch (error) {
      dispatch({
        type: SEARCH_HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification('Error'));
    }
  };
};
