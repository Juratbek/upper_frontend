import { configureStore } from '@reduxjs/toolkit';

import authReducer from './states/auth';
import authModalReducer from './states/authModal';
import commentsSidebarReducer from './states/commentsModal';
import publishModalReducer from './states/publishModal';
import unsubscribeModalReducer from './states/unsubscribeModal';
import writeArticleReducer from './states/writeArticle';

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
    writeArticle: writeArticleReducer,
    auth: authReducer,
    comments: commentsSidebarReducer,
    unsubscribeModal: unsubscribeModalReducer,
    publishModal: publishModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type TDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
