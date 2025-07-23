import { BANNER_HAS_ERROR, BANNER_RESET, BANNER_SUCCESS } from './actions';

export const initialState = {
  data: {},
  error: {},
};

export const fetchBannersReducer = (state = initialState, action) => {
  switch (action.type) {
    case BANNER_RESET:
      return {
        ...state,
        data: {},
        error: {},
      };
    case BANNER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: {},
      };
    case BANNER_HAS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
