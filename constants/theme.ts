import { ITheme, TSelectedThemeOption, TTheme } from 'types';

export const THEME_COLORS: Record<TTheme, ITheme> = {
  light: {
    icon: 'black',
    border: 'rgba(0, 0, 0, 0.25)',
    popover: {
      bg: 'white',
      border: 'rgba(0, 0, 0, 0.25)',
    },
    input: {
      border: 'rgba(0, 0, 0, 0.25)',
    },
    avatar: {
      border: 'rgba(245, 245, 245, 0.1)',
    },
  },
  dark: {
    icon: '#c5d1de',
    border: '#4b535d',
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
  },
};

export const THEME_OPTIONS: { label: string; value: TSelectedThemeOption }[] = [
  {
    label: "Qorong'u",
    value: 'dark',
  },
  {
    label: "Yorug'",
    value: 'light',
  },
  {
    label: 'Qurilma temasi',
    value: 'device-theme',
  },
];
