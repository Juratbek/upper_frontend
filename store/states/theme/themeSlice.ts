import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_THEME } from 'hooks/useTheme/useTheme.constants';
import { TSelectedThemeOption, TTheme } from 'types';

interface IThemeState {
  theme: TTheme;
  selectedThemeOption: TSelectedThemeOption;
}

const initialState: IThemeState = {
  theme: 'light',
  selectedThemeOption: 'device-theme',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<TTheme>) {
      state.theme = payload;
    },
    setSelectedThemeOption(state, { payload }: PayloadAction<TSelectedThemeOption>) {
      localStorage.setItem(USER_THEME, payload);
      state.selectedThemeOption = payload;
    },
  },
});

export const { setTheme, setSelectedThemeOption } = themeSlice.actions;
export default themeSlice.reducer;
