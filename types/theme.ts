export type TTheme = 'light' | 'dark';

export type TSelectedThemeOption = TTheme | 'device-theme';

export interface ITheme {
  icon: string;
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
