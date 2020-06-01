import { loanRequestFormReducer as reducer, initialState } from './reducer';
import * as actions from './actions';

describe('Loan Request Form reducer test', () => {
  it('should have initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change loading state on loading action', () => {
    const action = {
      type: actions.IS_LOADING,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should change data state on success action', () => {
    const createdLoan = { field: '123' };
    const action = {
      type: actions.SUCCESS,
      payload: createdLoan,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      data: createdLoan,
      hasError: false,
      isSuccessful: true,
    });
  });

  it('should change error state on error action', () => {
    const action = {
      type: actions.HAS_ERROR,
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
