import { http } from '@api/base';
import { invenioConfig } from '@config';
import _get from 'lodash/get';
import { sessionManager, User } from './SessionManager';

class AuthenticationService {
  loginWithOauthProvider = (nextUrl: string, providerUrl: string): void => {
    sessionManager.setAnonymous();
    const redirectOauthUrl = `${_get(
      invenioConfig.APP,
      'INVENIO_UI_URL'
    )}${providerUrl}?next=${encodeURIComponent(nextUrl)}`;
    window.location.href = redirectOauthUrl;
  };

  loginWithLocalAccount = (data: Record<string, any>) => {
    const loginUrl = `${invenioConfig.APP.REST_ENDPOINTS_BASE_URL}/login`;
    return http.post(loginUrl, data);
  };

  logout = (): void => {
    const logoutUrl = `${invenioConfig.APP.REST_ENDPOINTS_BASE_URL}/logout`;
    window.location.replace(logoutUrl);
  };

  confirmUser = (token: string) => {
    return http.post('/confirm-email', { token });
  };

  hasRoles = (user: User, roles: string[]): boolean => {
    if (!roles.length) {
      return true;
    }
    // any of needed roles found in user roles
    return roles.some((role) => user.roles.indexOf(role) !== -1);
  };
}

export const authenticationService = new AuthenticationService();
