import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlogRegisterResponse } from 'store/apis/blog/blog.types';
import { TAuthStatus } from 'types';
import { REFRESH_TOKEN, TOKEN } from 'variables';

interface IAuthState {
  status: TAuthStatus;
  isAuthenticated: boolean | null;
  isGoogleScriptLoaded: boolean;
}

const initialState: IAuthState = {
  status: 'loading',
  isAuthenticated: null,
  isGoogleScriptLoaded: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate(state, { payload }: PayloadAction<IBlogRegisterResponse>) {
      try {
        localStorage.setItem(TOKEN, payload.token);
        localStorage.setItem(REFRESH_TOKEN, payload.refreshToken);
        state.status = 'authenticated';
        state.isAuthenticated = true;
      } catch (e) {
        console.error(e);
      }
    },
    unauthenticate(state) {
      try {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        state.status = 'unauthenticated';
        state.isAuthenticated = false;
      } catch (e) {
        console.error(e);
      }
    },
    setIsGoogleScriptLoaded(state, { payload }: PayloadAction<boolean>) {
      state.isGoogleScriptLoaded = payload;
    },
  },
});

export const { authenticate, unauthenticate, setIsGoogleScriptLoaded } = authSlice.actions;
export default authSlice.reducer;
