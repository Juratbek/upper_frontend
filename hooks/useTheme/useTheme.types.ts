import { TTheme } from 'types/theme';

export type TSetTheme = (theme: TTheme) => unknown;

export interface IUseTheme {
  theme: TTheme;
  setTheme: TSetTheme;
}
