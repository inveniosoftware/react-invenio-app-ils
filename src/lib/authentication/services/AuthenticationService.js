import { http } from '@api/base';
import { invenioConfig } from '@config';
import _get from 'lodash/get';
import { sessionManager } from './SessionManager';

class AuthenticationService {
  loginWithOauthProvider = (nextUrl, providerUrl) => {
    sessionManager.setAnonymous();
    const redirectOauthUrl = `${_get(
      invenioConfig.APP,
      'INVENIO_UI_URL'
    )}${providerUrl}?next=${encodeURIComponent(nextUrl)}`;
    window.location = redirectOauthUrl;
  };

  loginWithLocalAccount = (data) => {
    const loginUrl = `${invenioConfig.APP.REST_ENDPOINTS_BASE_URL}/login`;
    return http.post(loginUrl, data);
  };

  logout = () => {
    const logoutUrl = `${invenioConfig.APP.REST_ENDPOINTS_BASE_URL}/logout`;
    window.location.replace(logoutUrl);
  };

  confirmUser = (token) => {
    return http.post('/confirm-email', { token });
  };

  hasRoles = (user, roles) => {
    if (!roles.length) {
      return true;
    }
    // any of needed roles found in user roles
    return roles.some((role) => user.roles.indexOf(role) !== -1);
  };
}

export const authenticationService = new AuthenticationService();
