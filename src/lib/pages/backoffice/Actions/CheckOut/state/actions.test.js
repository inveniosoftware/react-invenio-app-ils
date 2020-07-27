import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;
beforeEach(() => {
  store = mockStore(initialState);
  store.clearActions();
});

describe('Check Out tests', () => {
  it('should dispatch an action updating the query', async () => {
    const expectedAction = {
      type: actions.QUERY_STRING_UPDATE,
      payload: 'New query',
    };
    await store.dispatch(actions.updateQueryString('New query'));
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
  it('should dispatch an action to clear search', async () => {
    const expectedAction = {
      type: actions.CLEAR_SEARCH,
    };
    await store.dispatch(actions.clearSearch());
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
  it('should dispatch an action to clear results', async () => {
    const expectedAction = {
      type: actions.CLEAR_RESULTS,
    };
    await store.dispatch(actions.clearResults());
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
