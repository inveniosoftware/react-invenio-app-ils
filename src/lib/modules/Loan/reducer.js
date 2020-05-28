import {
  IS_LOADING,
  SUCCESS,
  HAS_ERROR,
  DETAILS_IS_LOADING,
  DETAILS_SUCCESS,
  DETAILS_HAS_ERROR,
} from './actions';

export const initialState = {
  data: {},
  error: {},
  isLoading: true,
  hasError: false,
};

export const loanActionReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true };
    case SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: {},
        isLoading: false,
        hasError: false,
      };
    case HAS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
};

export const initialDetailsState = {
  data: {},
  error: {},
  isLoading: true,
  hasError: false,
};

export const loanDetailsReducer = (state = initialDetailsState, action) => {
  switch (action.type) {
    case DETAILS_IS_LOADING:
      return { ...state, isLoading: true };
    case DETAILS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: {},
        isLoading: false,
        hasError: false,
      };
    case DETAILS_HAS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
};
