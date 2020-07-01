import {
  IS_ANONYMOUS,
  IS_CONFIRMED,
  IS_CONFIRMED_LOADING,
  IS_LOADING,
  SUCCESS,
} from './actions';

export const initialState = {
  isLoading: true,
  isAnonymous: true,
  isConfirmedLoading: true,
  isConfirmed: false,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...action.payload,
          id: `${action.payload['id']}`,
        },
        isAnonymous: false,
      };
    case IS_ANONYMOUS:
      return {
        ...state,
        isLoading: false,
        isAnonymous: true,
        data: {},
      };
    case IS_CONFIRMED:
      return {
        ...state,
        isConfirmedLoading: false,
        isConfirmed: action.payload['isConfirmed'],
      };
    case IS_CONFIRMED_LOADING:
      return { ...state, isConfirmedLoading: true };
    default:
      return state;
  }
};
