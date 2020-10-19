import { loanApi } from '@api/loans';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';

jest.mock('@config');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockResponse = {
  data: {
    hits: {
      hits: [
        {
          id: 123,
          updated: '2018-01-01T11:05:00+01:00',
          created: '2018-01-01T11:05:00+01:00',
          metadata: { pid: '123' },
        },
      ],
    },
  },
};

const mockFetchPatronPasttLoans = jest.fn();
loanApi.list = mockFetchPatronPasttLoans;

let store;
beforeEach(() => {
  mockFetchPatronPasttLoans.mockClear();

  store = mockStore({ patronPastLoans: initialState });
  store.clearActions();
});

describe('Patron past loans tests', () => {
  it('should dispatch a loading action when fetching patron loans', async () => {
    mockFetchPatronPasttLoans.mockResolvedValue(mockResponse);
    const expectedAction = {
      type: actions.IS_LOADING,
    };
    await store.dispatch(actions.fetchPatronPastLoans(2));
    expect(mockFetchPatronPasttLoans).toHaveBeenCalledWith(
      '(patron_pid:2 AND state:(ITEM_RETURNED OR CANCELLED))&sort=-created&size=15&page=1'
    );
    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  it('should dispatch a success action when patron loans fetch succeeds', async () => {
    mockFetchPatronPasttLoans.mockResolvedValue(mockResponse);
    const expectedAction = {
      type: actions.SUCCESS,
      payload: mockResponse.data,
    };
    await store.dispatch(actions.fetchPatronPastLoans(2));
    expect(mockFetchPatronPasttLoans).toHaveBeenCalledWith(
      '(patron_pid:2 AND state:(ITEM_RETURNED OR CANCELLED))&sort=-created&size=15&page=1'
    );
    expect(store.getActions()[1]).toEqual(expectedAction);
  });

  it('should dispatch an error action when patron loans fetch fails', async () => {
    mockFetchPatronPasttLoans.mockRejectedValue([500, 'Error']);
    const expectedAction = {
      type: actions.HAS_ERROR,
      payload: [500, 'Error'],
    };
    await store.dispatch(actions.fetchPatronPastLoans(2));
    expect(mockFetchPatronPasttLoans).toHaveBeenCalledWith(
      '(patron_pid:2 AND state:(ITEM_RETURNED OR CANCELLED))&sort=-created&size=15&page=1'
    );
    expect(store.getActions()[1]).toEqual(expectedAction);
  });

  it('should dispatch a delayed loading action when fetching patron loans', async () => {
    mockFetchPatronPasttLoans.mockResolvedValue(mockResponse);
    const expectedAction = {
      type: actions.IS_LOADING,
    };
    await store.dispatch(actions.fetchPatronPastLoans(2));
    expect(mockFetchPatronPasttLoans).toHaveBeenCalledWith(
      '(patron_pid:2 AND state:(ITEM_RETURNED OR CANCELLED))&sort=-created&size=15&page=1'
    );
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
