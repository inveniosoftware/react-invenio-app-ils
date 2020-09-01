import { documentRequestApi } from '@api/documentRequests';
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

const mockFetchPatronDocumentRequests = jest.fn();
documentRequestApi.list = mockFetchPatronDocumentRequests;

let store;
beforeEach(() => {
  mockFetchPatronDocumentRequests.mockClear();

  store = mockStore({ patronDocumentRequests: initialState });
  store.clearActions();
});

describe('Patron document requests tests', () => {
  describe('fetch Patron document requests tests', () => {
    it('should dispatch a loading action when fetching patron document requests', async () => {
      mockFetchPatronDocumentRequests.mockResolvedValue(mockResponse);

      const expectedAction = {
        type: actions.IS_LOADING,
      };

      await store.dispatch(actions.fetchPatronDocumentRequests(2));
      expect(mockFetchPatronDocumentRequests).toHaveBeenCalledWith(
        '(patron_pid:2 AND state:PENDING)&sort=-mostrecent&size=15&page=1'
      );
      expect(store.getActions()[0]).toEqual(expectedAction);
    });

    it('should dispatch a success action when patron document requests fetch succeeds', async () => {
      mockFetchPatronDocumentRequests.mockResolvedValue(mockResponse);

      const expectedAction = {
        type: actions.SUCCESS,
        payload: mockResponse.data,
      };

      await store.dispatch(actions.fetchPatronDocumentRequests(2));
      expect(mockFetchPatronDocumentRequests).toHaveBeenCalledWith(
        '(patron_pid:2 AND state:PENDING)&sort=-mostrecent&size=15&page=1'
      );
      expect(store.getActions()[1]).toEqual(expectedAction);
    });

    it('should dispatch an error action when patron document requests fetch fails', async () => {
      mockFetchPatronDocumentRequests.mockRejectedValue([500, 'Error']);

      const expectedAction = {
        type: actions.HAS_ERROR,
        payload: [500, 'Error'],
      };

      await store.dispatch(actions.fetchPatronDocumentRequests(2));
      expect(mockFetchPatronDocumentRequests).toHaveBeenCalledWith(
        '(patron_pid:2 AND state:PENDING)&sort=-mostrecent&size=15&page=1'
      );
      expect(store.getActions()[1]).toEqual(expectedAction);
    });

    it('should dispatch a delayed loading action when fetching patron document requests', async () => {
      mockFetchPatronDocumentRequests.mockResolvedValue(mockResponse);

      const expectedAction = {
        type: actions.IS_LOADING,
      };

      await store.dispatch(actions.fetchPatronDocumentRequests(2));
      expect(mockFetchPatronDocumentRequests).toHaveBeenCalledWith(
        '(patron_pid:2 AND state:PENDING)&sort=-mostrecent&size=15&page=1'
      );
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});
