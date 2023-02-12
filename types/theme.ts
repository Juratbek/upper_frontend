export type TTheme = 'light' | 'dark';

export interface ITheme {
  font: string;
  icon: string;
  bg: string;
  border: string;
  modal: {
    bg: string;
    dialogBg: string;
    dialogBorder: string;
  };
  popover: {
    bg: string;
    border: string;
  };
}
