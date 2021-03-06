import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';
import { loanApi } from '@api/loans';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockSendOverdueLoansMailReminder = jest.fn();
loanApi.sendOverdueLoansMailReminder = mockSendOverdueLoansMailReminder;

const response = { data: {} };
const expectedPayload = {};

let store;
beforeEach(() => {
  mockSendOverdueLoansMailReminder.mockClear();
  store = mockStore(initialState);
  store.clearActions();
});

describe('SendMailModal actions', () => {
  it('should dispatch an action when trying to send an email', async () => {
    mockSendOverdueLoansMailReminder.mockResolvedValue(response);
    const expectedAction = {
      type: actions.IS_LOADING,
    };
    await store.dispatch(actions.sendOverdueLoansMailReminder('123'));
    expect(mockSendOverdueLoansMailReminder).toHaveBeenCalledWith('123');
    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  it('should dispatch an action when send mail succeeds', async () => {
    mockSendOverdueLoansMailReminder.mockResolvedValue(response);
    const expectedAction = {
      type: actions.SUCCESS,
      payload: expectedPayload,
    };
    await store.dispatch(actions.sendOverdueLoansMailReminder('123'));
    expect(mockSendOverdueLoansMailReminder).toHaveBeenCalledWith('123');
    expect(store.getActions()[1]).toEqual(expectedAction);
  });

  it('should dispatch an action when send mail fails', async () => {
    mockSendOverdueLoansMailReminder.mockRejectedValue([500, 'Error']);
    const expectedAction = {
      type: actions.HAS_ERROR,
      payload: [500, 'Error'],
    };
    await store.dispatch(actions.sendOverdueLoansMailReminder('456'));
    expect(mockSendOverdueLoansMailReminder).toHaveBeenCalledWith('456');
    expect(store.getActions()[1]).toEqual(expectedAction);
  });
});
