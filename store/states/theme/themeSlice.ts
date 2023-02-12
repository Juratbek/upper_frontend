import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTheme } from 'types/theme';

interface IThemeState {
  theme: TTheme;
}

const initialState: IThemeState = {
  theme: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<TTheme>) {
      state.theme = payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
