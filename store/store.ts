import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { articleApi, blogApi, labelApi } from './apis';
import loginModalReducer from './states/loginModal';
import registerModalReducer from './states/registerModal';

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [labelApi.reducerPath]: labelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware, articleApi.middleware, labelApi.middleware),
});

const makeStore = (): EnhancedStore => store;

export type TDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;

export const wrapper = createWrapper(makeStore);
