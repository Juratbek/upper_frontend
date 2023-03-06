import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthState, ICurrentBlog } from './authSlice.types';

const initialState: IAuthState = {
  status: 'loading',
  isAuthenticated: null,
  isGoogleScriptLoaded: false,
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
    setIsGoogleScriptLoaded(state, { payload }: PayloadAction<boolean>) {
      state.isGoogleScriptLoaded = payload;
    },
    setCurrentBlog(state, { payload }: PayloadAction<ICurrentBlog>) {
      state.currentBlog = payload;
    },
  },
});

export const { authenticate, unauthenticate, setIsGoogleScriptLoaded, setCurrentBlog } =
  authSlice.actions;
export default authSlice.reducer;
