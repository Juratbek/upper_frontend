import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import authReducer from './states/auth';
import authModalReducer from './states/authModal';
import commentsSidebarReducer from './states/commentsModal';
import unsubscribeModalReducer from './states/unsubscribeModal';
import writeArticleReducer from './states/writeArticle';

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    writeArticle: writeArticleReducer,
    auth: authReducer,
    comments: commentsSidebarReducer,
    unsubscribeModal: unsubscribeModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStore = () => store;

export type TDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;

export const wrapper = createWrapper(makeStore);
