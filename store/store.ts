import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { articleApi, blogApi, labelApi } from './apis';
import loginModalReducer from './states/loginModal';
import readArticleReducer from './states/readArticle';
import registerModalReducer from './states/registerModal';
import writeArticleReducer from './states/writeArticle';

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
    writeArticle: writeArticleReducer,
    readArticle: readArticleReducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [labelApi.reducerPath]: labelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware, articleApi.middleware, labelApi.middleware),
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStore = () => store;

export type TDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;

export const wrapper = createWrapper(makeStore);
