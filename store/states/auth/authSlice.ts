import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn } from 'next-auth/react';
import { IBlog } from 'types';
import { TOKEN } from 'variables';

interface IAuthState {
  blog: IBlog | null;
  token: string | null;
}

const initialState: IAuthState = {
  blog: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate(state, { payload }: PayloadAction<string>) {
      localStorage.setItem(TOKEN, payload);
      signIn('credentials', { username: 'jsmith', password: '1234' });
      state.token = payload;
    },
    setToken(state, { payload }: PayloadAction<string>) {
      state.token = payload;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
