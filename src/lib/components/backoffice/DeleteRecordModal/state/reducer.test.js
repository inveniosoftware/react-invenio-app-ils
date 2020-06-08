import reducer, { initialState } from './reducer';
import { IS_LOADING, SUCCESS, HAS_ERROR } from './actions';

describe('Create delete record modal reducer', () => {
  it('should have initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change loading state when fetching references', () => {
    const action = {
      type: IS_LOADING,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should change data state on success action', () => {
    const response = { data: [], total: 0 };
    const action = {
      type: SUCCESS,
      payload: response,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      data: response,
      error: {},
      hasError: false,
    });
  });

  it('should change error state on check refs error', () => {
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
});
