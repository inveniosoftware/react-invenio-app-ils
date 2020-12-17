import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';
import { documentApi } from '@api/documents';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockGet = jest.fn();
documentApi.get = mockGet;

const response = { data: {} };
const expectedPayload = {};

let store;
beforeEach(() => {
  mockGet.mockClear();

  store = mockStore(initialState);
  store.clearActions();
});

describe('Document details actions', () => {
  describe('Fetch document details tests', () => {
    it('should dispatch an action when fetching an item', (done) => {
      mockGet.mockResolvedValue(response);

      const expectedActions = [
        {
          type: actions.IS_LOADING,
        },
      ];

      store.dispatch(actions.fetchDocumentsDetails('123')).then(() => {
        expect(mockGet).toHaveBeenCalledWith('123');
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedActions[0]);
        done();
      });
    });

    it('should dispatch an action when document fetch succeeds', (done) => {
      mockGet.mockResolvedValue(response);

      const expectedActions = [
        {
          type: actions.SUCCESS,
          payload: expectedPayload,
          loansPayload: null,
        },
      ];

      store.dispatch(actions.fetchDocumentsDetails('123')).then(() => {
        expect(mockGet).toHaveBeenCalledWith('123');
        const actions = store.getActions();
        expect(actions[1]).toEqual(expectedActions[0]);
        done();
      });
    });

    it('should dispatch an action when document fetch fails', (done) => {
      mockGet.mockRejectedValue([500, 'Error']);

      const expectedActions = [
        {
          type: actions.HAS_ERROR,
          payload: [500, 'Error'],
        },
      ];

      store.dispatch(actions.fetchDocumentsDetails('456')).then(() => {
        expect(mockGet).toHaveBeenCalledWith('456');
        const actions = store.getActions();
        expect(actions[1]).toEqual(expectedActions[0]);
        done();
      });
    });
  });
});
