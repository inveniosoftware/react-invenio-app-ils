import { IS_LOADING, SUCCESS, HAS_ERROR, SHOW_TAB } from './actions';

export const initialState = {
  isLoading: true,
  hasError: false,
  data: { metadata: {} },
  loansData: {},
  error: {},
};

export const documentDetailsFrontReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        loansData: action.loansPayload,
        error: {},
        hasError: false,
      };
    case HAS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        hasError: true,
      };
    case SHOW_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
    default:
      return state;
  }
};
