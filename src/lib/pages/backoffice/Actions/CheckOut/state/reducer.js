import {
  CLEAR_SEARCH,
  CLEAR_RESULTS,
  QUERY_STRING_UPDATE,
  SEARCH_PATRON_SUCCESS,
  SEARCH_ITEM_SUCCESS,
  SEARCH_HAS_ERROR,
  SEARCH_IS_LOADING,
} from './actions';

export const initialState = {
  isLoading: false,
  hasError: false,
  queryString: '',
  patronList: [],
  itemList: [],
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_IS_LOADING:
      return { ...state, isLoading: true, patronList: [], itemList: [] };
    case QUERY_STRING_UPDATE:
      return { ...state, queryString: action.payload };
    case SEARCH_PATRON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patronList: action.payload,
        error: {},
      };
    case SEARCH_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        itemList: action.payload,
        error: {},
      };
    case SEARCH_HAS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        hasError: true,
      };
    case CLEAR_SEARCH:
      return { ...state, queryString: '' };
    case CLEAR_RESULTS:
      return { ...state, itemList: [], patronList: [] };
    default:
      return state;
  }
};
