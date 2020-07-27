import { itemApi } from '@api/items';
import { patronApi } from '@api/patrons';
import {
  addNotification,
  sendErrorNotification,
} from '@components/Notifications';
import { invenioConfig } from '@config';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';

export const CLEAR_SEARCH = 'checkOutSearch/CLEAR_SEARCH';
export const CLEAR_RESULTS = 'checkOutSearch/CLEAR_RESULTS';
export const QUERY_STRING_UPDATE = 'checkOutSearch/QUERY_STRING_UPDATE';
export const SEARCH_IS_LOADING = 'checkOutSearch/SEARCH_IS_LOADING';
export const SEARCH_HAS_ERROR = 'checkOutSearch/SEARCH_HAS_ERROR';
export const SEARCH_PATRON_SUCCESS = 'checkOutSearch/SEARCH_PATRON_SUCCESS  ';
export const SEARCH_ITEM_SUCCESS = 'checkOutSearch/SEARCH_ITEM_SUCCESS  ';

export const updateQueryString = queryString => {
  return dispatch => {
    dispatch({
      type: QUERY_STRING_UPDATE,
      payload: queryString,
    });
  };
};

export const clearSearch = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_SEARCH,
    });
  };
};

export const clearResults = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_RESULTS,
    });
  };
};

const searchPatrons = async (dispatch, term) => {
  const response = await patronApi.list(
    patronApi
      .query()
      .withEmail(term, true)
      .withName(term, true)
      .withPatronUniqueID(term)
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
  const response = await itemApi.list(
    itemApi
      .query()
      .withBarcode(term)
      .qs()
  );

  dispatch({
    type: SEARCH_ITEM_SUCCESS,
    payload: response.data.hits,
  });

  return response.data.hits;
};

const handleError = (dispatch, term, error) => {
  if (!error.response) {
    dispatch(
      addNotification(
        'Error',
        `${term} did not match any patron ${invenioConfig.PATRONS.patronUniqueID.label}, or any physical copy barcode.`,
        'error'
      )
    );
  }
  dispatch({
    type: SEARCH_HAS_ERROR,
    payload: error,
  });
  dispatch(sendErrorNotification('Error'));
};

export const checkOutSearch = term => {
  return async dispatch => {
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

      if (patrons.length === 0 && items.length === 0) throw Error('No match');
    } catch (error) {
      handleError(dispatch, term, error);
    }
  };
};
