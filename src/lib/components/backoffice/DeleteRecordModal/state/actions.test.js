import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockReferences = jest.fn();

let store;
beforeEach(() => {
  mockReferences.mockClear();
  store = mockStore(initialState);
  store.clearActions();
});

describe('Delete Record Modal', () => {
  describe('Fetch References', () => {
    it('should dispatch an action when fetching record references', async () => {
      const expectedAction = {
        type: actions.IS_LOADING,
      };

      store.dispatch(actions.fetchReferences([mockReferences()]));
      expect(mockReferences).toHaveBeenCalled();
      expect(store.getActions()[0]).toEqual(expectedAction);
    });

    it('should dispatch an action when references fetch succeeds', async () => {
      mockReferences.mockResolvedValue({
        data: {
          hits: [{ id: 1 }],
          total: 1,
        },
      });

      const expectedAction = {
        type: actions.SUCCESS,
        payload: [
          {
            hits: [{ id: 1 }],
            total: 1,
          },
        ],
      };

      await store.dispatch(actions.fetchReferences([mockReferences()]));
      expect(mockReferences).toHaveBeenCalled();
      expect(store.getActions()[1]).toEqual(expectedAction);
    });

    it('should dispatch an action when fetch references has error', async () => {
      const error = {
        error: { status: 500, message: 'error' },
      };
      mockReferences.mockRejectedValue(error);

      const expectedAction = {
        type: actions.HAS_ERROR,
        payload: error,
      };

      await store.dispatch(actions.fetchReferences([mockReferences()]));
      expect(mockReferences).toHaveBeenCalled();
      expect(store.getActions()[1]).toEqual(expectedAction);
    });
  });
});
