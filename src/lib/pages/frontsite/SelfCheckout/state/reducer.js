import {
  SEARCH_HAS_ERROR,
  SEARCH_IS_LOADING,
  SEARCH_ITEM_SUCCESS,
  UPDATE_RESULT_MESSAGE,
} from './actions';

export const initialState = {
  error: {},
  // hasError: false,
  isLoading: false,
  item: null,
  // queryString: '',
  resultMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_HAS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        // hasError: true,
        resultMessage: '',
      };
    case SEARCH_IS_LOADING:
      return { ...state, isLoading: true, resultMessage: '' };
    case SEARCH_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: action.payload,
        error: {},
        resultMessage: '',
      };
    case UPDATE_RESULT_MESSAGE:
      return { ...state, resultMessage: action.payload };
    default:
      return state;
  }
};
