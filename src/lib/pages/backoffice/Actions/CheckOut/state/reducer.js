import {
  CLEAR_RESULTS,
  SEARCH_HAS_ERROR,
  SEARCH_IS_LOADING,
  SEARCH_ITEM_SUCCESS,
  SEARCH_PATRON_SUCCESS,
  UPDATE_RESULT_MESSAGE,
} from './actions';

export const initialState = {
  error: {},
  hasError: false,
  isLoading: false,
  itemList: [],
  patronList: [],
  queryString: '',
  resultMessage: 'Insert patron id/email or physical copy barcode',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_RESULTS:
      return { ...state, queryString: '', itemList: [], patronList: [] };
    case SEARCH_HAS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        hasError: true,
      };
    case SEARCH_IS_LOADING:
      return { ...state, isLoading: true, patronList: [], itemList: [] };
    case SEARCH_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        itemList: action.payload,
        error: {},
      };
    case SEARCH_PATRON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patronList: action.payload,
        error: {},
      };
    case UPDATE_RESULT_MESSAGE:
      return { ...state, resultMessage: action.payload };
    default:
      return state;
  }
};
