import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';
import { itemApi } from '@api/items';
import {
  IS_LOADING,
  SUCCESS,
  HAS_ERROR,
  QUERY_STRING_UPDATE,
  CLEAR_SEARCH,
} from './types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = {
  data: {
    hits: {
      hits: [{ id: 123, updated: '2018-01-01T11:05:00+01:00', metadata: {} }],
    },
  },
};

const mockFetchItems = jest.fn();
itemApi.list = mockFetchItems;

let store;
beforeEach(() => {
  mockFetchItems.mockClear();

  store = mockStore({ documentItems: initialState });
  store.clearActions();
});

describe('Item search by barcode tests', () => {
  describe('Fetch items by barcode tests', () => {
    it('should dispatch a loading action when fetching items', async () => {
      mockFetchItems.mockResolvedValue(mockResponse);

      const expectedAction = {
        type: IS_LOADING,
      };

      store.dispatch(actions.fetchAndCheckoutIfOne('123'));
      expect(mockFetchItems).toHaveBeenCalledWith('barcode:123');
      expect(store.getActions()[0]).toEqual(expectedAction);
    });

    it('should dispatch a success action when items fetch succeeds', async () => {
      mockFetchItems.mockResolvedValue(mockResponse);

      const expectedAction = {
        type: SUCCESS,
        payload: mockResponse.data,
      };

      await store.dispatch(actions.fetchAndCheckoutIfOne('123'));
      expect(mockFetchItems).toHaveBeenCalledWith('barcode:123');
      expect(store.getActions()[1]).toEqual(expectedAction);
    });

    it('should dispatch an error action when items fetch fails', async () => {
      mockFetchItems.mockRejectedValue([500, 'Error']);

      const expectedAction = {
        type: HAS_ERROR,
        payload: [500, 'Error'],
      };

      await store.dispatch(actions.fetchAndCheckoutIfOne('123'));
      expect(mockFetchItems).toHaveBeenCalledWith('barcode:123');
      expect(store.getActions()[1]).toEqual(expectedAction);
    });

    it('should dispatch a query string update action', (done) => {
      const expectedAction = {
        type: QUERY_STRING_UPDATE,
        queryString: 'pppp',
      };

      store.dispatch(actions.updateQueryString('pppp'));
      const updatedActions = store.getActions();
      expect(updatedActions[0]).toEqual(expectedAction);
      done();
    });

    it('should dispatch clear query action', (done) => {
      const expectedAction = {
        type: CLEAR_SEARCH,
      };

      store.dispatch(actions.clearResults());
      const updatedActions = store.getActions();
      expect(updatedActions[0]).toEqual(expectedAction);
      done();
    });
  });
});
