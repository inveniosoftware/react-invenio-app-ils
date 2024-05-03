import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';
import { itemApi } from '@api/items';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockGet = jest.fn();
itemApi.get = mockGet;

const response = { data: {} };
const expectedPayload = {};

let store;
beforeEach(() => {
  mockGet.mockClear();

  store = mockStore(initialState);
  store.clearActions();
});

describe('SelfCheck Out test', () => {
  it('should dispatch an action updating the payloadresult item', async () => {
    mockGet.mockResolvedValue(response);

    const expectedAction = {
      type: actions.SEARCH_ITEM_SUCCESS,
      payload: expectedPayload,
    };
    await store.dispatch(actions.selfCheckOutSearch('123'));
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
