import { createSlice } from '@reduxjs/toolkit';
import { TAuthStatus } from 'types';

interface IAuthState {
  status: TAuthStatus;
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  status: 'unauthenticated',
  isAuthenticated: false,
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
  },
});

export const { authenticate, unauthenticate } = authSlice.actions;
export default authSlice.reducer;
