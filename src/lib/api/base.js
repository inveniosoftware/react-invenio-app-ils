import { invenioConfig } from '@config';
import { goTo } from '@history';
import { AuthenticationRoutes } from '@routes/urls';
import axios from 'axios';

const apiConfig = {
  baseURL: invenioConfig.REST_ENDOINTS_BASE_URL,
  withCredentials: true,
};

const URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED = ['/me'];

const urlShouldNotRedirect = url => {
  return URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED.some(val => url.endsWith(val));
};

const http = axios.create(apiConfig);

const responseRejectInterceptor = error => {
  if (
    error.response &&
    error.response.status === 401 &&
    !urlShouldNotRedirect(error.response.request.responseURL)
  ) {
    goTo(`${AuthenticationRoutes.login}?sessionExpired`);
  }

  return Promise.reject(error);
};

http.interceptors.response.use(undefined, responseRejectInterceptor);

export { http, apiConfig, responseRejectInterceptor };
