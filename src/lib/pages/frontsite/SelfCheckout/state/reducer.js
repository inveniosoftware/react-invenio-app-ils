import {
  SEARCH_HAS_ERROR,
  SEARCH_IS_LOADING,
  SEARCH_ITEM_SUCCESS,
} from './actions';

export const initialState = {
  error: {},
  isLoading: false,
  item: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_HAS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SEARCH_IS_LOADING:
      return { ...state, isLoading: true };
    case SEARCH_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: action.payload,
        error: {},
      };
    default:
      return state;
  }
};
