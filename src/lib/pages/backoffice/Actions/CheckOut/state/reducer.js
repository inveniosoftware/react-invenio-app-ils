/*
 * SPDX-FileCopyrightText: 2020-2026 CERN.
 * SPDX-License-Identifier: MIT
 */

import {
  ADD_TO_CHECKOUT_LIST,
  CHECKOUT_LIST_DONE,
  CHECKOUT_LIST_IS_LOADING,
  CLEAR_RESULTS,
  REMOVE_FROM_CHECKOUT_LIST,
  SEARCH_HAS_ERROR,
  SEARCH_IS_LOADING,
  SEARCH_ITEM_SUCCESS,
  SEARCH_PATRON_SUCCESS,
  UPDATE_RESULT_MESSAGE,
} from './actions';

export const initialState = {
  error: {},
  hasError: false,
  isLoading: false,
  checkOutList: [],
  checkOutListIsLoading: false,
  itemList: [],
  patronList: [],
  queryString: '',
  resultMessage: 'Insert patron id/email or physical copy barcode',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_RESULTS:
      return { ...state, queryString: '', itemList: [], patronList: [] };
    case SEARCH_HAS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        hasError: true,
      };
    case SEARCH_IS_LOADING:
      return { ...state, isLoading: true, patronList: [], itemList: [] };
    case SEARCH_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        itemList: action.payload,
        error: {},
      };
    case SEARCH_PATRON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patronList: action.payload,
        error: {},
      };
    case ADD_TO_CHECKOUT_LIST: {
      const alreadyAdded = state.checkOutList.some(
        (item) => item.metadata.pid === action.payload.metadata.pid
      );
      return {
        ...state,
        isLoading: false,
        itemList: [],
        checkOutList: alreadyAdded
          ? state.checkOutList
          : [...state.checkOutList, action.payload],
      };
    }
    case REMOVE_FROM_CHECKOUT_LIST:
      return {
        ...state,
        checkOutList: state.checkOutList.filter(
          (item) => item.metadata.pid !== action.payload
        ),
      };
    case CHECKOUT_LIST_IS_LOADING:
      return { ...state, checkOutListIsLoading: true };
    case CHECKOUT_LIST_DONE:
      return {
        ...state,
        checkOutListIsLoading: false,
        checkOutList: state.checkOutList.filter(
          (item) => !action.payload.includes(item.metadata.pid)
        ),
      };
    case UPDATE_RESULT_MESSAGE:
      return { ...state, resultMessage: action.payload };
    default:
      return state;
  }
};
