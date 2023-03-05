import { AnyAction, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { blogApi } from 'store/apis';
import { IBlogRegisterResponse } from 'store/apis/blog/blog.types';
import { authenticate, setCurrentBlog, unauthenticate } from 'store/states';
import { setLocalStorateTokens } from 'utils/auth/auth';
import { REFRESH_TOKEN } from 'variables';

export const apiErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => async (action) => {
  if (isRejectedWithValue(action)) {
    const status: number = action.payload?.status;
    const endpointName = action.meta?.arg?.endpointName;
    const isGetNewTokenApi = endpointName === 'getNewToken';
    if (isGetNewTokenApi && [401, 400, 500, 403, 404].includes(status)) {
      const { dispatch } = api;
      dispatch(unauthenticate());
      window.location.replace('/');
    }

    if (status === 401) {
      const { dispatch } = api;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) {
        dispatch(unauthenticate());
      } else {
        const res = (await dispatch(
          blogApi.endpoints.getNewToken.initiate(refreshToken) as unknown as AnyAction,
        )) as unknown as { data: IBlogRegisterResponse };
        const { data } = res;
        await dispatch(authenticate());
        setLocalStorateTokens({ token: data.token, refreshToken: data.refreshToken });
        await dispatch(setCurrentBlog(res.data));
        window.location.reload();
      }
    }
  }
  return next(action);
};
