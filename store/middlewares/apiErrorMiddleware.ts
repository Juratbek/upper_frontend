import { AnyAction, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { blogApi } from 'store/apis';
import { IBlogRegisterResponse } from 'store/apis/blog/blog.types';
import { authenticate, setCurrentBlog, unauthenticate } from 'store/states';
import { removeLocalStorageTokens, setLocalStorateTokens } from 'utils';
import { REFRESH_TOKEN, WEB_APP_ROOT_DIR } from 'variables';

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

    if (status === 401) {
      const { dispatch } = api;
      dispatch(unauthenticate());

      // const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      // if (!refreshToken) {
      //   dispatch(unauthenticate());
      // } else {
      //   const res = (await dispatch(
      //     blogApi.endpoints.getNewToken.initiate(refreshToken) as unknown as AnyAction,
      //   )) as unknown as { data: IBlogRegisterResponse };
      //   const { data } = res;
      //   await dispatch(authenticate());
      //   setLocalStorateTokens({ token: data.token, refreshToken: data.refreshToken });
      //   await dispatch(setCurrentBlog(res.data));
      //   // window.location.reload();
      // }
    }
  }
  return next(action);
};
