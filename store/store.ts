import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import {
  articleApi,
  blogApi,
  commentApi,
  docsApi,
  feedbackApi,
  labelApi,
  labelRequestApi,
  notificationApi,
  publishedArticleApi,
  publishedTutorialApi,
  quizApi,
  subscriptionApi,
  tutorialApi,
} from './apis';
import { apiErrorMiddleware } from './middlewares';
import authReducer from './states/auth';
import authModalReducer from './states/authModal';
import commentsSidebarReducer from './states/commentsSidebar';
import publishedTutorialSidebarReducer from './states/publishedTutorialSidebar';
import readArticleReducer from './states/readArticle';
import sidebarReducer from './states/sidebar';
import tutorialsSidebarReducer from './states/tutorialsSidebar';
import writeArticleReducer from './states/writeArticle';

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    writeArticle: writeArticleReducer,
    readArticle: readArticleReducer,
    auth: authReducer,
    comments: commentsSidebarReducer,
    sidebar: sidebarReducer,
    tutorialsSidebar: tutorialsSidebarReducer,
    publishedTutorialSidebar: publishedTutorialSidebarReducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [labelApi.reducerPath]: labelApi.reducer,
    [publishedArticleApi.reducerPath]: publishedArticleApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [docsApi.reducerPath]: docsApi.reducer,
    [labelRequestApi.reducerPath]: labelRequestApi.reducer,
    [publishedTutorialApi.reducerPath]: publishedTutorialApi.reducer,
    [tutorialApi.reducerPath]: tutorialApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogApi.middleware,
      articleApi.middleware,
      labelApi.middleware,
      publishedArticleApi.middleware,
      commentApi.middleware,
      notificationApi.middleware,
      docsApi.middleware,
      labelRequestApi.middleware,
      publishedArticleApi.middleware,
      tutorialApi.middleware,
      feedbackApi.middleware,
      subscriptionApi.middleware,
      quizApi.middleware,
      apiErrorMiddleware,
    ),
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStore = () => store;

export type TDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;

export const wrapper = createWrapper(makeStore);
