import { invenioConfig } from '@config';
import { goTo } from '@history';
import { AuthenticationRoutes, FrontSiteRoutes } from '@routes/urls';
import axios from 'axios';

const apiConfig = {
  baseURL: invenioConfig.APP.REST_ENDOINTS_BASE_URL,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'HTTP_X_CSRFTOKEN',
};

const URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED = ['/me', '/me/loans'];

const urlShouldNotRedirect = url => {
  return URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED.some(val =>
    url.split('?', 1)[0].endsWith(val)
  );
};

const http = axios.create(apiConfig);

const errorsList = [404, 429, 500];

const responseRejectInterceptor = error => {
  if (
    error.response &&
    error.response.status === 401 &&
    !urlShouldNotRedirect(error.response.request.responseURL)
  ) {
    goTo(`${AuthenticationRoutes.login}?sessionExpired`);
  }

  if (error.response && errorsList.includes(error.response.status)) {
    error.response.data.error_id
      ? goTo(FrontSiteRoutes.errors, {
          errorCode: error.response.status,
          errorId: error.response.data.error_id,
        })
      : goTo(FrontSiteRoutes.errors, {
          errorCode: error.response.status,
        });
  }

  return Promise.reject(error);
};

http.interceptors.response.use(undefined, responseRejectInterceptor);

export { http, apiConfig, responseRejectInterceptor };
