import { loanDetailsReducer, initialDetailsState } from './reducer';
import {
  DETAILS_IS_LOADING,
  DETAILS_SUCCESS,
  DETAILS_HAS_ERROR,
} from './actions';

describe('Fetch loan details reducer', () => {
  it('should have initial state', () => {
    expect(loanDetailsReducer(undefined, {})).toEqual(initialDetailsState);
  });

  it('should change loading state on loading action', () => {
    const action = {
      type: DETAILS_IS_LOADING,
    };
    expect(loanDetailsReducer(initialDetailsState, action)).toEqual({
      ...initialDetailsState,
      isLoading: true,
    });
  });

  it('should change data state on success action', () => {
    const loan = { field: '123' };
    const action = {
      type: DETAILS_SUCCESS,
      payload: loan,
    };
    expect(loanDetailsReducer(initialDetailsState, action)).toEqual({
      ...initialDetailsState,
      isLoading: false,
      data: loan,
      hasError: false,
    });
  });

  it('should change error state on error action', () => {
    const action = {
      type: DETAILS_HAS_ERROR,
      payload: 'Error',
    };
    expect(loanDetailsReducer(initialDetailsState, action)).toEqual({
      ...initialDetailsState,
      isLoading: false,
      error: 'Error',
      hasError: true,
    });
  });
});
