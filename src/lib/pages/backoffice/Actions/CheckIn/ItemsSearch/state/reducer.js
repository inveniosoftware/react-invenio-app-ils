import {
  LOAN_IS_LOADING,
  LOAN_SUCCESS,
  LOAN_HAS_ERROR,
  MULTIPLE_LOAN_RESULTS,
  CHECKIN_IS_LOADING,
  CHECKIN_SUCCESS,
  CHECKIN_HAS_ERROR,
  CLEAR,
} from './actions';

export const initialState = {
  isLoading: true,
  hasError: false,
  itemCheckInQueryString: '',
  data: {},
  error: {},
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAN_IS_LOADING:
      return { ...state, isLoading: true };
    case LOAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {},
        hasError: false,
      };
    case LOAN_HAS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        hasError: true,
      };
    case MULTIPLE_LOAN_RESULTS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: {},
        hasError: false,
      };
    case CHECKIN_IS_LOADING:
      return { ...state, isLoading: true };
    case CHECKIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: {},
        items: [...state.items, action.payload],
        hasError: false,
      };
    case CHECKIN_HAS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        hasError: true,
      };
    case CLEAR:
      return { ...state, items: [], data: {} };
    default:
      return state;
  }
};
