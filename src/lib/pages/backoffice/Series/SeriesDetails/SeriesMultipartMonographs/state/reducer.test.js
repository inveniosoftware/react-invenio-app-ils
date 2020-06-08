import { HAS_ERROR, IS_LOADING, SUCCESS } from './actions';
import reducer, { initialState } from './reducer';

describe('Fetch Series Document reducer', () => {
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
    const SeriesMultipartMonographs = [{ field: '123' }, { field: '456' }];
    const action = {
      type: SUCCESS,
      payload: SeriesMultipartMonographs,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      data: SeriesMultipartMonographs,
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
});
