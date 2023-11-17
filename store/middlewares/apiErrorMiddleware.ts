import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { unauthenticate } from 'store/states';
import { removeLocalStorageTokens } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

export const apiErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => async (action) => {
  if (isRejectedWithValue(action)) {
    const status: number = action.payload?.status;
    const endpointName = action.meta?.arg?.endpointName;
    const isGetNewTokenApi = endpointName === 'getNewToken';
    if (isGetNewTokenApi && [401, 400, 500, 403, 404].includes(status)) {
      const { dispatch } = api;
      dispatch(unauthenticate());
      removeLocalStorageTokens();
      window.location.replace(
        `${WEB_APP_ROOT_DIR}/login?redirect=${
          window.location.pathname
        }&message=${'Token muddati yakunlandi. Iltimos profilingizga qaytadan kiring'}`,
      );
    }

    if (status === 401 || status === 403) {
      const { dispatch } = api;
      dispatch(unauthenticate());
      removeLocalStorageTokens();
    }
  }
  return next(action);
};
