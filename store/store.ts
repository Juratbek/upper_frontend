import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import loginModalReducer from './slices/loginModalSlice';

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
  },
});

const makeStore = (): EnhancedStore => store;

export type TDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;

export const wrapper = createWrapper(makeStore);
