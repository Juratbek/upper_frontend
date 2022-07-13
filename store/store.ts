import { configureStore } from '@reduxjs/toolkit';

import loginModalReducer from './slices/loginModalSlice';

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
  },
});

export type TDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
