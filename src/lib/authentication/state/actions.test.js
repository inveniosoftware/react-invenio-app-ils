import { authenticationService } from '@authentication/services/AuthenticationService';
import { userApi } from '@api/users/user';
import { sessionManager } from '@authentication/services/SessionManager';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { initialState } from './reducer';

jest.mock('@config');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = {
  data: {
    confirmed_at: null,
    email: 'admin@test.ch',
    id: 3,
    last_login_at: '2020-01-13T07:01:01.442388',
    location_pid: '1',
    roles: ['admin'],
    username: 'admin',
  },
};

const mockFetchProfile = jest.fn();
const mockConfirmUser = jest.fn();
authenticationService.confirmUser = mockConfirmUser;
userApi.get = mockFetchProfile;

const mockSessionSetUser = jest.fn();
const mockSessionSetAnonymous = jest.fn();
const mockSessionSetUserConfirmed = jest.fn();

sessionManager.setUser = mockSessionSetUser;
sessionManager.setAnonymous = mockSessionSetAnonymous;
sessionManager.setUserConfirmed = mockSessionSetUserConfirmed;
sessionManager.user = mockResponse.data;

let store;
beforeEach(() => {
  mockFetchProfile.mockClear();

  store = mockStore({ authenticationManagement: initialState });
  store.clearActions();
});

describe('Authentication action tests', () => {
  describe('fetch User profile and confirm user actions', () => {
    it('should dispatch a loading action when fetching user profile', (done) => {
      mockFetchProfile.mockResolvedValue(mockResponse);

      const expectedAction = {
        type: actions.IS_LOADING,
      };

      store.dispatch(actions.fetchUserProfile()).then(() => {
        expect(mockFetchProfile).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
        done();
      });
    });

    it('should dispatch a success action when fetching user profile succeeds', (done) => {
      mockFetchProfile.mockResolvedValue(mockResponse);

      const expectedAction = {
        type: actions.SUCCESS,
        payload: mockResponse.data,
      };

      store.dispatch(actions.fetchUserProfile()).then(() => {
        expect(mockFetchProfile).toHaveBeenCalled();
        expect(mockSessionSetUser).toHaveBeenCalledWith(expectedAction.payload);
        const actions = store.getActions();
        expect(actions[1]).toEqual(expectedAction);
        done();
      });
    });

    it('should dispatch an error action when fetching user profile fails', (done) => {
      mockFetchProfile.mockRejectedValue([500, 'Error']);

      const expectedAction = {
        type: actions.IS_ANONYMOUS,
      };

      store.dispatch(actions.fetchUserProfile()).then(() => {
        expect(mockFetchProfile).toHaveBeenCalled();
        expect(mockSessionSetAnonymous).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions[1]).toEqual(expectedAction);
        done();
      });
    });

    it('should dispatch a loading action when confirming user', (done) => {
      mockConfirmUser.mockResolvedValue({});

      const expectedAction = {
        type: actions.IS_CONFIRMED_LOADING,
      };
      const token = '11111';

      store.dispatch(actions.confirmUser(token)).then(() => {
        expect(mockConfirmUser).toHaveBeenCalledWith(token);
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
        done();
      });
    });

    it('should dispatch an `IS_CONFIRMED` action when confirming user succeeds', (done) => {
      mockConfirmUser.mockResolvedValue(mockResponse);

      const expectedAction = {
        type: actions.IS_CONFIRMED,
        payload: { isConfirmed: true },
      };
      const token = '11111';

      store.dispatch(actions.confirmUser(token)).then(() => {
        expect(mockConfirmUser).toHaveBeenCalledWith(token);
        expect(mockSessionSetUserConfirmed).toHaveBeenCalledWith(true);
        const actions = store.getActions();
        expect(actions[1]).toEqual(expectedAction);
        done();
      });
    });

    it('should dispatch an `IS_CONFIRMED` action when confirming user fails', (done) => {
      mockConfirmUser.mockRejectedValue([500, 'Error']);

      const expectedAction = {
        type: actions.IS_CONFIRMED,
        payload: { isConfirmed: false },
      };
      const token = '11111';

      store.dispatch(actions.confirmUser(token)).then(() => {
        expect(mockConfirmUser).toHaveBeenCalled();
        expect(mockSessionSetUserConfirmed).toHaveBeenCalledWith(false);
        const actions = store.getActions();
        expect(actions[1]).toEqual(expectedAction);
        done();
      });
    });
  });
});
