import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { articleApi } from './article/article.api';
import { blogApi } from './blog/blog.api';
import loginModalReducer from './loginModal/loginModalSlice';

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware, articleApi.middleware),
});

const makeStore = (): EnhancedStore => store;

export type TDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;

export const wrapper = createWrapper(makeStore);
