import { TSelectedThemeOption, TTheme } from 'types';

export type TSetTheme = (theme: TTheme) => unknown;

export type TSetSelectedThemeOption = (theme: TSelectedThemeOption) => unknown;

export interface IThemeContext {
  theme: TTheme;
  changeTheme: TSetSelectedThemeOption;
  selectedThemeOption: TSelectedThemeOption;
}
