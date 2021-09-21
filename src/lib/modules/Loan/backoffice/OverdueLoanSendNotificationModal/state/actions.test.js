import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';
import { loanApi } from '@api/loans';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockSendOverdueLoansNotificationReminder = jest.fn();
loanApi.sendOverdueLoansNotificationReminder =
  mockSendOverdueLoansNotificationReminder;

const response = { data: {} };
const expectedPayload = {};

let store;
beforeEach(() => {
  mockSendOverdueLoansNotificationReminder.mockClear();
  store = mockStore(initialState);
  store.clearActions();
});

describe('SendNotificationModal actions', () => {
  it('should dispatch an action when trying to send a notification', async () => {
    mockSendOverdueLoansNotificationReminder.mockResolvedValue(response);
    const expectedAction = {
      type: actions.IS_LOADING,
    };
    await store.dispatch(actions.sendOverdueLoansNotificationReminder('123'));
    expect(mockSendOverdueLoansNotificationReminder).toHaveBeenCalledWith(
      '123'
    );
    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  it('should dispatch an action when send mail succeeds', async () => {
    mockSendOverdueLoansNotificationReminder.mockResolvedValue(response);
    const expectedAction = {
      type: actions.SUCCESS,
      payload: expectedPayload,
    };
    await store.dispatch(actions.sendOverdueLoansNotificationReminder('123'));
    expect(mockSendOverdueLoansNotificationReminder).toHaveBeenCalledWith(
      '123'
    );
    expect(store.getActions()[1]).toEqual(expectedAction);
  });

  it('should dispatch an action when send mail fails', async () => {
    mockSendOverdueLoansNotificationReminder.mockRejectedValue([500, 'Error']);
    const expectedAction = {
      type: actions.HAS_ERROR,
      payload: [500, 'Error'],
    };
    await store.dispatch(actions.sendOverdueLoansNotificationReminder('456'));
    expect(mockSendOverdueLoansNotificationReminder).toHaveBeenCalledWith(
      '456'
    );
    expect(store.getActions()[1]).toEqual(expectedAction);
  });
});
