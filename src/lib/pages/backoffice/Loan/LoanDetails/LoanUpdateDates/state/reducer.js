import { IS_LOADING, SUCCESS, HAS_ERROR, CLEAR } from './actions';

export const initialState = {
  isLoading: false,
  hasError: false,
  data: {},
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
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
    case CLEAR:
      return initialState;
    default:
      return state;
  }
};
