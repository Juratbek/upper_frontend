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
  },
  dark: {
    font: '#ffffffd9',
    icon: '#ffffffd9',
    bg: '#252a31',
    border: '#4b535d',
    modal: {
      bg: 'rgba(0, 0, 0, 0.3)',
      dialogBg: '#343a42',
      dialogBorder: '1px solid #4b535d',
    },
    popover: {
      bg: '#343a42',
      border: '#4b535d',
    },
    input: {
      border: '#ffffffb3',
    },
  },
};
