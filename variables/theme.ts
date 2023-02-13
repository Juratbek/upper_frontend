import { ITheme, TTheme } from 'types/theme';

export const THEME_COLORS: Record<TTheme, ITheme> = {
  light: {
    font: 'black',
    icon: 'black',
    bg: 'white',
    border: 'rgba(0, 0, 0, 0.25)',
    modal: {
      bg: 'rgba(0, 0, 0, 0.25)',
      dialogBg: 'white',
      dialogBorder: '1px solid transparent',
    },
    popover: {
      bg: 'white',
      border: 'white',
    },
    input: {
      border: 'rgba(0, 0, 0, 0.25)',
    },
    avatar: {
      border: 'rgba(245, 245, 245, 0.1)',
    },
    label: {
      color: 'rgb(117 117 117)',
    },
  },
  dark: {
    font: '#ffffffd9',
    icon: '#ffffffd9',
    bg: '#252a31',
    border: '#4b535d',
    modal: {
      bg: 'rgba(0, 0, 0, 0.3)',
      dialogBg: 'hsl(213 12% 21% / 1)',
      dialogBorder: '1px solid #4b535d',
    },
    popover: {
      bg: '#343a42',
      border: '#4b535d',
    },
    input: {
      border: '#ffffff99',
    },
    avatar: {
      border: '#252a31',
    },
    label: {
      color: '#c2c2c2',
    },
  },
};

export const THEMES: { label: string; value: TTheme }[] = [
  {
    label: "Qoron'gu",
    value: 'dark',
  },
  {
    label: "Yoru'g",
    value: 'light',
  },
];
