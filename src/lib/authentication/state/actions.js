import { authenticationService } from '@authentication/services/AuthenticationService';
import { sessionManager } from '@authentication/services/SessionManager';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';

export const IS_LOADING = 'fetchUserInfo/IS_LOADING';
export const SUCCESS = 'fetchUserInfo/SUCCESS';
export const IS_ANONYMOUS = 'fetchUserInfo/IS_ANONYMOUS';

export const IS_CONFIRMED_LOADING = 'confirmUser/IS_LOADING';
export const IS_CONFIRMED = 'confirmUser/IS_CONFIRMED';

export const fetchUserProfile = () => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await authenticationService.fetchProfile();
      sessionManager.setUser(response.data);
      dispatch({
        type: SUCCESS,
        payload: sessionManager.user,
      });
    } catch (error) {
      sessionManager.setAnonymous();
      dispatch({
        type: IS_ANONYMOUS,
      });
    }
  };
};

export const logout = () => {
  return async dispatch => {
    await authenticationService.logout();
    sessionManager.setAnonymous();
    dispatch({
      type: IS_ANONYMOUS,
    });
    goTo(FrontSiteRoutes.home);
  };
};

export const confirmUser = token => {
  return async dispatch => {
    dispatch({
      type: IS_CONFIRMED_LOADING,
    });
    try {
      await authenticationService.confirmUser(token);
      sessionManager.setUserConfirmed(true);
      dispatch({
        type: IS_CONFIRMED,
        payload: {
          isConfirmed: true,
        },
      });
    } catch (error) {
      sessionManager.setUserConfirmed(false);
      dispatch({
        type: IS_CONFIRMED,
        payload: {
          isConfirmed: false,
        },
      });
    }
  };
};
