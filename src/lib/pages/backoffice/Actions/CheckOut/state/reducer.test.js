/*
 * SPDX-FileCopyrightText: 2020-2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import reducer, { initialState } from './reducer';
import {
  ADD_TO_CHECKOUT_LIST,
  CHECKOUT_LIST_DONE,
  CHECKOUT_LIST_IS_LOADING,
  CLEAR_RESULTS,
  REMOVE_FROM_CHECKOUT_LIST,
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

  it('should add the item to the check-out list on ADD_TO_CHECKOUT_LIST action', () => {
    const item = { metadata: { pid: 'item-pid' } };
    inputState.itemList = [item];
    const action = {
      type: ADD_TO_CHECKOUT_LIST,
      payload: item,
    };
    expect(reducer(inputState, action)).toEqual({
      ...inputState,
      isLoading: false,
      itemList: [],
      checkOutList: [item],
    });
  });

  it('should not add the same item twice on ADD_TO_CHECKOUT_LIST action', () => {
    const item = { metadata: { pid: 'item-pid' } };
    inputState.checkOutList = [item];
    const action = {
      type: ADD_TO_CHECKOUT_LIST,
      payload: item,
    };
    expect(reducer(inputState, action).checkOutList).toEqual([item]);
  });

  it('should remove the item from the check-out list on REMOVE_FROM_CHECKOUT_LIST action', () => {
    inputState.checkOutList = [
      { metadata: { pid: 'item-1' } },
      { metadata: { pid: 'item-2' } },
    ];
    const action = {
      type: REMOVE_FROM_CHECKOUT_LIST,
      payload: 'item-1',
    };
    expect(reducer(inputState, action)).toEqual({
      ...inputState,
      checkOutList: [{ metadata: { pid: 'item-2' } }],
    });
  });

  it('should start the loader on CHECKOUT_LIST_IS_LOADING action', () => {
    const action = {
      type: CHECKOUT_LIST_IS_LOADING,
    };
    expect(reducer(inputState, action)).toEqual({
      ...inputState,
      checkOutListIsLoading: true,
    });
  });

  it('should stop the loader and remove checked out items on CHECKOUT_LIST_DONE action', () => {
    inputState.checkOutListIsLoading = true;
    inputState.checkOutList = [
      { metadata: { pid: 'item-1' } },
      { metadata: { pid: 'item-2' } },
    ];
    const action = {
      type: CHECKOUT_LIST_DONE,
      payload: ['item-1'],
    };
    expect(reducer(inputState, action)).toEqual({
      ...inputState,
      checkOutListIsLoading: false,
      checkOutList: [{ metadata: { pid: 'item-2' } }],
    });
  });
});
