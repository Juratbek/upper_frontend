import { createSlice } from '@reduxjs/toolkit';
import { TAuthStatus } from 'types';

interface IAuthState {
  status: TAuthStatus;
}

const initialState: IAuthState = {
  status: 'unauthenticated',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate(state) {
      state.status = 'authenticated';
    },
    unauthenticate(state) {
      state.status = 'unauthenticated';
    },
  },
});

export const { authenticate, unauthenticate } = authSlice.actions;
export default authSlice.reducer;
