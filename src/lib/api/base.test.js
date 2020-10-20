import { goTo, replaceTo } from '@history';
import { http } from './base';

jest.mock('@history', () => ({
  listen: jest.fn(),
  goTo: jest.fn(),
  replaceTo: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const errorInterceptor = http.interceptors.response.handlers[0];

describe('Axios response interceptor tests no error', () => {
  it('should do not nothing if no error response', () => {
    const errorPayload = {};
    const promise = expect(
      errorInterceptor.rejected(errorPayload)
    ).rejects.toMatchObject(errorPayload);

    expect(goTo).not.toHaveBeenCalled();
    expect(replaceTo).not.toHaveBeenCalled();

    return promise;
  });

  it('should do not nothing if generic 400 error without message', () => {
    const errorPayload = {
      config: {
        url: '/backoffice',
      },
      response: {
        status: 400,
      },
    };
    const promise = expect(
      errorInterceptor.rejected(errorPayload)
    ).rejects.toMatchObject(errorPayload);

    expect(goTo).not.toHaveBeenCalled();
    expect(replaceTo).not.toHaveBeenCalled();

    return promise;
  });

  it('should do not nothing if generic 400 error with no CSRF message', () => {
    const errorPayload = {
      config: {
        url: '/backoffice',
      },
      response: {
        status: 400,
        data: {
          message: 'another error...',
        },
      },
    };
    const promise = expect(
      errorInterceptor.rejected(errorPayload)
    ).rejects.toMatchObject(errorPayload);

    expect(goTo).not.toHaveBeenCalled();
    expect(replaceTo).not.toHaveBeenCalled();

    return promise;
  });
});

describe('Axios response interceptor tests for 401', () => {
  it('should redirect to login session expired on 401', () => {
    const errorPayload = {
      config: {
        url: '/backoffice',
      },
      response: {
        status: 401,
      },
    };
    const promise = expect(
      errorInterceptor.rejected(errorPayload)
    ).rejects.toMatchObject(errorPayload);

    expect(goTo).toHaveBeenCalledWith('/login?sessionExpired');
    expect(replaceTo).not.toHaveBeenCalled();

    return promise;
  });

  it('should not redirect to login session expired on 401 for /me', () => {
    const errorPayload = {
      config: {
        url: '/me',
      },
      response: {
        status: 401,
      },
    };
    const promise = expect(
      errorInterceptor.rejected(errorPayload)
    ).rejects.toMatchObject(errorPayload);

    expect(goTo).not.toHaveBeenCalled();
    expect(replaceTo).not.toHaveBeenCalled();

    return promise;
  });

  it('should not redirect to login session expired on 401 for /me/loans', () => {
    const errorPayload = {
      config: {
        url: '/me/loans',
      },
      response: {
        status: 401,
      },
    };
    const promise = expect(
      errorInterceptor.rejected(errorPayload)
    ).rejects.toMatchObject(errorPayload);

    expect(goTo).not.toHaveBeenCalled();
    expect(replaceTo).not.toHaveBeenCalled();

    return promise;
  });
});

describe('Axios response interceptor tests for CSRF errors', () => {
  it('should retry on CSRF cookie/token missing errors', () => {
    const errorPayload = {
      config: {
        url: '/stats',
      },
      response: {
        status: 400,
        data: {
          message: 'CSRF cookie is missing!',
        },
      },
    };

    // mock the request
    http.request = jest.fn(data => Promise.resolve(data));

    const promise = expect(
      errorInterceptor.rejected(errorPayload)
    ).resolves.toMatchObject({ _retry: true });

    // make sure the request is called with the `_retry: true`
    expect(http.request.mock.calls.length).toBe(1);
    expect(goTo).not.toHaveBeenCalled();
    expect(replaceTo).not.toHaveBeenCalled();

    return promise;
  });

  it('should not retry on CSRF cookie/token missing errors if already retried', () => {
    const errorPayload = {
      config: {
        url: '/stats',
        _retry: true,
      },
      response: {
        status: 400,
        data: {
          message: 'CSRF token missing...',
        },
      },
    };

    const promise = expect(
      errorInterceptor.rejected(errorPayload)
    ).rejects.toMatchObject(errorPayload);

    expect(goTo).not.toHaveBeenCalled();
    expect(replaceTo).not.toHaveBeenCalled();

    return promise;
  });
});

describe('Axios response interceptor tests for errors with dedicated page', () => {
  it('should redirect to error page on 404', () => {
    const errorPayload = {
      config: {
        url: '/literature/not-existing',
      },
      response: {
        status: 404,
      },
    };
    const promise = expect(
      errorInterceptor.rejected(errorPayload)
    ).rejects.toMatchObject(errorPayload);

    expect(goTo).not.toHaveBeenCalled();
    expect(replaceTo).toHaveBeenCalledWith('/error', { errorCode: 404 });

    return promise;
  });

  it('should redirect to error page on 429', () => {
    const errorPayload = {
      config: {
        url: '/api/documents/',
      },
      response: {
        status: 429,
        data: {},
      },
    };
    const promise = expect(
      errorInterceptor.rejected(errorPayload)
    ).rejects.toMatchObject(errorPayload);

    expect(goTo).not.toHaveBeenCalled();
    expect(replaceTo).toHaveBeenCalledWith('/error', { errorCode: 429 });

    return promise;
  });

  it('should redirect to error page on 500 with payload', () => {
    const errorPayload = {
      config: {
        url: '/api/documents/',
      },
      response: {
        status: 500,
        data: {
          error_id: 'sentry error id',
        },
      },
    };
    const promise = expect(
      errorInterceptor.rejected(errorPayload)
    ).rejects.toMatchObject(errorPayload);

    expect(goTo).not.toHaveBeenCalled();
    expect(replaceTo).toHaveBeenCalledWith('/error', {
      errorCode: 500,
      errorId: 'sentry error id',
    });

    return promise;
  });
});
