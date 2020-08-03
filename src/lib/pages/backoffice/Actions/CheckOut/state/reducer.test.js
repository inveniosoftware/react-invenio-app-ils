import reducer, { initialState } from './reducer';
import {
  CLEAR_RESULTS,
  SEARCH_IS_LOADING,
  SEARCH_HAS_ERROR,
  SEARCH_PATRON_SUCCESS,
  SEARCH_ITEM_SUCCESS,
  UPDATE_RESULT_MESSAGE,
} from './actions';
import _clone from 'lodash/clone';

let inputState;

beforeEach(async () => {
  inputState = _clone(initialState);
});

describe('Check Out reducer', () => {
  it('should have initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should clear search results on CLEAR_RESULTS action', () => {
    inputState.itemList = [{ pid: 'item-pid' }];
    inputState.patronList = [{ pid: 'patron-pid' }];
    const action = {
      type: CLEAR_RESULTS,
    };
    expect(reducer(inputState, action)).toEqual({
      ...inputState,
      itemList: [],
      patronList: [],
    });
  });

  it('should updat search query on UPDATE_RESULT_MESSAGE action', () => {
    const action = {
      type: UPDATE_RESULT_MESSAGE,
      payload: 'There are no results',
    };
    expect(reducer(inputState, action)).toEqual({
      ...inputState,
      resultMessage: action.payload,
    });
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
      hasError: true,
    });
  });

  it('should stop the loader and return the patron on SEARCH_PATRON_SUCCESS action', () => {
    const action = {
      type: SEARCH_PATRON_SUCCESS,
      payload: [{ pid: 'patron-pid' }],
    };
    expect(reducer(inputState, action)).toEqual({
      ...inputState,
      isLoading: false,
      patronList: [{ pid: 'patron-pid' }],
      error: {},
    });
  });

  it('should stop the loader and return the item on SEARCH_ITEM_SUCCESS action', () => {
    const action = {
      type: SEARCH_ITEM_SUCCESS,
      payload: [{ pid: 'item-pid' }],
    };
    expect(reducer(inputState, action)).toEqual({
      ...inputState,
      isLoading: false,
      itemList: action.payload,
      error: {},
    });
  });
});
