import reducer, { initialState } from './reducer';
import {
  SEARCH_IS_LOADING,
  SEARCH_HAS_ERROR,
  SEARCH_ITEM_SUCCESS,
} from './actions';
import _clone from 'lodash/clone';

let inputState;

beforeEach(async () => {
  inputState = _clone(initialState);
});

describe('SelfCheck Out reducer', () => {
  it('should have initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should start loader on SEARCH_IS_LOADING action', () => {
    const action = {
      type: SEARCH_IS_LOADING,
    };
    expect(reducer(inputState, action)).toEqual({
      ...inputState,
      isLoading: true,
    });
  });

  it('should return the error on SEARCH_HAS_ERROR action', () => {
    const action = {
      type: SEARCH_HAS_ERROR,
      payload: 'Error',
    };
    expect(reducer(inputState, action)).toEqual({
      ...inputState,
      isLoading: false,
      error: action.payload,
    });
  });

  it('should stop the loader and return the item on SEARCH_ITEM_SUCCESS action', () => {
    const action = {
      type: SEARCH_ITEM_SUCCESS,
      payload: { pid: 'item-pid' },
    };
    expect(reducer(inputState, action)).toEqual({
      ...inputState,
      isLoading: false,
      item: action.payload,
      error: {},
    });
  });
});
