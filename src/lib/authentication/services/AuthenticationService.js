import { http } from '@api/base';
import { invenioConfig } from '@config';
import _has from 'lodash/has';
import { sessionManager } from './SessionManager';

class AuthenticationService {
  loginWithOauthProvider = (nextUrl, providerUrl) => {
    sessionManager.setAnonymous();
    const redirectOauthUrl = `${
      invenioConfig.INVENIO_UI_URL
    }${providerUrl}?next=${encodeURIComponent(nextUrl)}`;
    window.location = redirectOauthUrl;
  };

  loginWithLocalAccount = data => {
    const loginUrl = `${invenioConfig.REST_ENDOINTS_BASE_URL}/login`;
    return http.post(loginUrl, data);
  };

  logout = () => {
    const logoutUrl = `${invenioConfig.REST_ENDOINTS_BASE_URL}/logout`;
    return http.post(logoutUrl);
  };

  fetchProfile = async () => {
    const res = await http.get('/me');
    if (_has(res, 'data.id')) {
      res.data.id = res.data.id.toString();
    }
    return res;
  };

  confirmUser = token => {
    return http.post('/confirm-email', { token });
  };

  hasRoles = (user, roles) => {
    if (!roles.length) {
      return true;
    }
    // any of needed roles found in user roles
    return roles.some(role => user.roles.indexOf(role) !== -1);
  };
}

export const authenticationService = new AuthenticationService();
