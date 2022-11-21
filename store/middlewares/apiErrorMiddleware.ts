import { AnyAction, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { blogApi } from 'store/apis';
import { IBlogRegisterResponse } from 'store/apis/blog/blog.types';
import { authenticate, unauthenticate } from 'store/states';
import { REFRESH_TOKEN } from 'variables';

export const apiErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => async (action) => {
  if (isRejectedWithValue(action)) {
    const status: number = action.payload?.status;

    if (status === 401) {
      const { dispatch } = api;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      const endpointName = action.meta?.arg?.endpointName;
      const isGetNewTokenApi = endpointName === 'getNewToken';

      if (!refreshToken || isGetNewTokenApi) {
        dispatch(unauthenticate());
      } else {
        const res = (await dispatch(
          blogApi.endpoints.getNewToken.initiate(refreshToken) as unknown as AnyAction,
        )) as unknown as { data: IBlogRegisterResponse };
        await dispatch(authenticate(res.data));
        window.location.reload();
      }
    }
  }
  return next(action);
};
