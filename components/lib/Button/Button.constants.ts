import { TSpinnerColor } from '../Spinner/Spinner.types';
import { TButtonColor } from './Button.types';

export const BUTTON_SPINNER_COLORS: Record<TButtonColor, TSpinnerColor> = {
  blue: 'dark',
  dark: 'light',
  light: 'dark',
  transparent: 'dark',
  'outline-blue': 'dark',
  'outline-dark': 'dark',
  'outline-red': 'red',
};
