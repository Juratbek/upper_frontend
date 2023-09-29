import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthState, ICurrentBlog } from './authSlice.types';

const initialState: IAuthState = {
  status: 'loading',
  isAuthenticated: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate(state) {
      state.status = 'authenticated';
      state.isAuthenticated = true;
    },
    unauthenticate(state) {
      state.status = 'unauthenticated';
      state.isAuthenticated = false;
    },
    setCurrentBlog(state, { payload }: PayloadAction<ICurrentBlog>) {
      state.currentBlog = payload;
    },
  },
});

export const { authenticate, unauthenticate, setCurrentBlog } = authSlice.actions;
export default authSlice.reducer;
