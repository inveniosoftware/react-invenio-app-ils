import { invenioConfig } from '@config';
import { goTo, replaceTo } from '@history';
import { AuthenticationRoutes, FrontSiteRoutes } from '@routes/urls';
import axios from 'axios';

const apiConfig = {
  baseURL: invenioConfig.APP.REST_ENDOINTS_BASE_URL,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'HTTP_X_CSRFTOKEN',
};
const http = axios.create(apiConfig);

const HTTP_STATUS_CODES_WITH_ERROR_PAGE = [404, 429, 500];
const URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED = ['/me', '/me/loans'];
// CSRF possible errors
const CSRF_ERROR_REASON_NO_COOKIE = 'CSRF cookie';
const CSRF_ERROR_REASON_BAD_TOKEN = 'CSRF token';
const CSRF_ERROR_REASON_BAD_SIGNATURE = 'CSRF error';

const urlShouldRedirect = (url) => {
  const urlPath = url.split('?', 1)[0];
  const pathsNoRedirect = URLS_NOT_TO_REDIRECT_IF_UNAUTHORIZED.filter((val) =>
    urlPath.endsWith(val)
  );
  const containsUrlNotRedirect = pathsNoRedirect.length > 0;
  return !containsUrlNotRedirect;
};

const goToErrorPage = (errorResponse) => {
  const state = {
    errorCode: errorResponse.status,
  };

  if (errorResponse.data && errorResponse.data.error_id) {
    state['errorId'] = errorResponse.data.error_id;
  }

  replaceTo(FrontSiteRoutes.errors, state);
};

const isCSRFError = (errorStatus, errorResponse) => {
  const isBadRequest = errorStatus === 400;
  const errorMessage = errorResponse.data && errorResponse.data.message;
  if (isBadRequest && errorMessage) {
    const isCSRFError =
      errorMessage.includes(CSRF_ERROR_REASON_NO_COOKIE) ||
      errorMessage.includes(CSRF_ERROR_REASON_BAD_TOKEN) ||
      errorMessage.includes(CSRF_ERROR_REASON_BAD_SIGNATURE);
    return isCSRFError;
  }
  return false;
};

const responseRejectInterceptor = (error) => {
  const errorResponse = error.response;
  if (errorResponse) {
    const errorStatus = errorResponse.status;
    const isUnauthorized = errorStatus === 401;
    const originalRequest = error.config;
    const requestURL = originalRequest.url;

    if (isUnauthorized && urlShouldRedirect(requestURL)) {
      goTo(`${AuthenticationRoutes.login}?sessionExpired`);
    } else {
      const alreadyRetried = originalRequest._retry;
      if (isCSRFError(errorStatus, errorResponse) && !alreadyRetried) {
        originalRequest._retry = true;
        return http.request(originalRequest);
      }

      const hasDedicatedPage = HTTP_STATUS_CODES_WITH_ERROR_PAGE.includes(
        errorStatus
      );
      if (hasDedicatedPage) {
        goToErrorPage(errorResponse);
      }
    }
  }

  return Promise.reject(error);
};

http.interceptors.response.use(undefined, responseRejectInterceptor);

export { http, apiConfig, responseRejectInterceptor };
