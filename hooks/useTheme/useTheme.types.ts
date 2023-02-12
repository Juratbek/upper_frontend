import { ITheme, TTheme } from 'types';

export type TSetTheme = (theme: TTheme) => unknown;

export interface IUseTheme {
  theme: TTheme;
  setTheme: TSetTheme;
  themeColors: ITheme;
}
