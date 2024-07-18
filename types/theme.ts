export type TTheme = 'light' | 'dark';

export type TSelectedThemeOption = TTheme | 'device-theme';

export interface ITheme {
  icon: string;
  input: {
    border: string;
  };
  avatar: {
    border: string;
  };
}
