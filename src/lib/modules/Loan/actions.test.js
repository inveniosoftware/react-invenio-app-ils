import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';
import { loanApi } from '@api';
import { sessionManager } from '@authentication/services';

jest.mock('@config/invenioConfig');

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
    it('should dispatch a loading action when performing loan action', done => {
      mockDoAction.mockResolvedValue(response);

      const expectedActions = [
        {
          type: actions.IS_LOADING,
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

    it('should call loan action with itemPid when passed', done => {
      mockDoAction.mockResolvedValue(response);
      return store
        .dispatch(
          actions.performLoanAction('urlForAction', '123', '1', {
            itemPid: { type: 'itemid', value: '333' },
          })
        )
        .then(() => {
          expect(mockDoAction).toHaveBeenCalledWith(
            'urlForAction',
            '123',
            '1',
            { itemPid: { type: 'itemid', value: '333' }, cancelReason: null }
          );
          done();
        });
    });

    it('should call loan action with cancelReason when passed', done => {
      mockDoAction.mockResolvedValue(response);
      return store
        .dispatch(
          actions.performLoanAction('urlForAction', '123', '1', {
            cancelReason: 'Not valid anymore',
          })
        )
        .then(() => {
          expect(mockDoAction).toHaveBeenCalledWith(
            'urlForAction',
            '123',
            '1',
            {
              itemPid: null,
              cancelReason: 'Not valid anymore',
            }
          );
          done();
        });
    });

    it('should dispatch a success action when loan action succeeds', done => {
      mockDoAction.mockResolvedValue(response);

      const expectedActions = [
        {
          type: actions.SUCCESS,
          payload: response.data,
        },
      ];

      return store
        .dispatch(actions.performLoanAction('urlForAction', '123', '1'))
        .then(() => {
          expect(mockDoAction).toHaveBeenCalledWith(
            'urlForAction',
            '123',
            '1',
            { itemPid: null, cancelReason: null }
          );
          const actions = store.getActions();
          expect(actions[1]).toEqual(expectedActions[0]);
          done();
        });
    });

    it('should dispatch an error action when oan action fails', done => {
      mockDoAction.mockRejectedValue([500, 'Error']);

      const expectedActions = [
        {
          type: actions.HAS_ERROR,
          payload: [500, 'Error'],
        },
      ];

      return store
        .dispatch(actions.performLoanAction('wrongUrlForAction', '123', '1'))
        .then(() => {
          expect(mockDoAction).toHaveBeenCalledWith(
            'wrongUrlForAction',
            '123',
            '1',
            { itemPid: null, cancelReason: null }
          );
          const actions = store.getActions();
          expect(actions[1]).toEqual(expectedActions[0]);
          done();
        });
    });
  });
});
