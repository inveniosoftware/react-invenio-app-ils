import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';
import { itemApi } from '@api/items';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockList = jest.fn();
itemApi.list = mockList;

const response = { data: {} };
const expectedPayload = null;

let store;
beforeEach(() => {
  mockList.mockClear();

  store = mockStore(initialState);
  store.clearActions();
});

describe('SelfCheck Out test', () => {
  it('should dispatch an action updating the payloadresult item', async () => {
    mockList.mockResolvedValue(response);

    const expectedAction1 = {
      type: actions.SEARCH_IS_LOADING,
    };
    const expectedAction2 = {
      type: actions.SEARCH_ITEM_SUCCESS,
      payload: expectedPayload,
    };
    await store.dispatch(actions.selfCheckOutSearch('123'));
    expect(store.getActions()[0]).toEqual(expectedAction1);
    expect(store.getActions()[1]).toEqual(expectedAction2);
  });
});
