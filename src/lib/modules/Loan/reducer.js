import {
  ACTION_HAS_ERROR,
  ACTION_IS_LOADING,
  ACTION_SUCCESS,
  CLEAR,
  DETAILS_HAS_ERROR,
  DETAILS_IS_LOADING,
  DETAILS_SUCCESS,
} from './actions';

export const initialState = {
  data: {},
  error: {},
  firstLoanRequested: {},
  isLoading: false,
  hasError: false,
};

export const loanActionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_IS_LOADING:
      return { ...state, isLoading: true };
    case ACTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: {},
        isLoading: false,
        hasError: false,
      };
    case ACTION_HAS_ERROR:
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
        firstLoanRequested: action.firstLoanRequested,
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
    case CLEAR:
      return { ...initialDetailsState };
    default:
      return state;
  }
};
