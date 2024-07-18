export type TTheme = 'light' | 'dark';

export type TSelectedThemeOption = TTheme | 'device-theme';

export interface ITheme {
  font: string;
  icon: string;
  bg: string;
  border: string;
  popover: {
    bg: string;
    border: string;
  };
  input: {
    border: string;
  };
  avatar: {
    border: string;
  };
}
