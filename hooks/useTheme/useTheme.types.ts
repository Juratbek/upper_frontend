import { ITheme, TSelectedThemeOption, TTheme } from 'types';

export type TSetTheme = (theme: TTheme) => unknown;

export type TSetSelectedThemeOption = (theme: TSelectedThemeOption) => unknown;

export interface IUseTheme {
  theme: TTheme;
  selectedThemeOption: TSelectedThemeOption;
  setTheme: TSetTheme;
  themeColors: ITheme;
  setSelectedThemeOption: TSetSelectedThemeOption;
}
