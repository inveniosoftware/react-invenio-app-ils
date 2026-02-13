import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';
import { loanApi } from '@api/loans';
import { sessionManager } from '@authentication/services/SessionManager';

jest.mock('@config');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockGet = jest.fn();
loanApi.get = mockGet;
const mockDoAction = jest.fn();
loanApi.doAction = mockDoAction;

sessionManager.user = { id: '2', locationPid: '2' };

const response = { data: {} };

const _initialState = {
  ...initialState,
  userSession: {
    userPid: 1,
    locationPid: 3,
  },
};

let store;
beforeEach(() => {
  mockGet.mockClear();
  mockDoAction.mockClear();

  store = mockStore(_initialState);
  store.clearActions();
});

describe('Loan details tests', () => {
  describe('Fetch loan action tests', () => {
    it('should dispatch a loading action when performing loan action', (done) => {
      mockDoAction.mockResolvedValue(response);

      const expectedActions = [
        {
          type: actions.ACTION_IS_LOADING,
        },
      ];

      store
        .dispatch(actions.performLoanAction('urlForAction', '123', '1'))
        .then(() => {
          expect(mockDoAction).toHaveBeenCalledWith(
            'urlForAction',
            '123',
            '1',
            { itemPid: null, cancelReason: null }
          );
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedActions[0]);
          done();
        });
    });

    it('should call loan action with itemPid when passed', async () => {
      mockDoAction.mockResolvedValue(response);
      await store.dispatch(
        actions.performLoanAction('urlForAction', '123', '1', {
          itemPid: { type: 'itemid', value: '333' },
        })
      );
      expect(mockDoAction).toHaveBeenCalledWith('urlForAction', '123', '1', {
        itemPid: { type: 'itemid', value: '333' },
        cancelReason: null,
      });
    });

    it('should call loan action with cancelReason when passed', async () => {
      mockDoAction.mockResolvedValue(response);
      await store.dispatch(
        actions.performLoanAction('urlForAction', '123', '1', {
          cancelReason: 'Not valid anymore',
        })
      );
      expect(mockDoAction).toHaveBeenCalledWith('urlForAction', '123', '1', {
        itemPid: null,
        cancelReason: 'Not valid anymore',
      });
    });

    it('should dispatch a success action when loan action succeeds', async () => {
      mockDoAction.mockResolvedValue(response);

      const expectedActions = [
        {
          type: actions.ACTION_SUCCESS,
          payload: response.data,
        },
      ];

      await store.dispatch(
        actions.performLoanAction('urlForAction', '123', '1')
      );
      expect(mockDoAction).toHaveBeenCalledWith('urlForAction', '123', '1', {
        itemPid: null,
        cancelReason: null,
      });
      const storeActions = store.getActions();
      expect(storeActions[1]).toEqual(expectedActions[0]);
    });

    it('should dispatch an error action when loan action fails', async () => {
      mockDoAction.mockRejectedValue([500, 'Error']);

      const expectedActions = [
        {
          type: actions.ACTION_HAS_ERROR,
          payload: [500, 'Error'],
        },
      ];

      await store.dispatch(
        actions.performLoanAction('wrongUrlForAction', '123', '1')
      );
      expect(mockDoAction).toHaveBeenCalledWith(
        'wrongUrlForAction',
        '123',
        '1',
        { itemPid: null, cancelReason: null }
      );
      const storeActions = store.getActions();
      expect(storeActions[1]).toEqual(expectedActions[0]);
    });
  });
});
