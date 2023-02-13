import { TRootState } from 'store/store';
import { TSelectedThemeOption, TTheme } from 'types/theme';

export const getTheme = (store: TRootState): TTheme => store.theme.theme;

export const getSelectedThemeOption = (store: TRootState): TSelectedThemeOption =>
  store.theme.selectedThemeOption;
