import reducer, { initialState } from './reducer';
import {
  IS_LOADING,
  SUCCESS,
  HAS_ERROR,
  QUERY_STRING_UPDATE,
  CLEAR_SEARCH,
} from './types';

describe('Fetch Document Item reducer', () => {
  it('should have initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change loading state on loading action', () => {
    const action = {
      type: IS_LOADING,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should change data state on success action', () => {
    const items = [{ field: '123' }, { field: '456' }];
    const action = {
      type: SUCCESS,
      payload: items,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      data: items,
      error: {},
      hasError: false,
    });
  });

  it('should change error state on error action', () => {
    const action = {
      type: HAS_ERROR,
      payload: 'Error',
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Error',
      hasError: true,
    });
  });

  it('should update query string on string update', () => {
    const action = {
      type: QUERY_STRING_UPDATE,
      queryString: 'ppppp',
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      itemCheckoutQueryString: 'ppppp',
    });
  });

  it('should erase query string when clear ', () => {
    const action = {
      type: CLEAR_SEARCH,
      queryString: 'ppppp',
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      itemCheckoutQueryString: '',
    });
  });
});
