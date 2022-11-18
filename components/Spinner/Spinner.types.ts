import { HTMLAttributes } from 'react';

export type TSpinnerColor =
  | 'dark'
  | 'outline-dark'
  | 'light'
  | 'outline-red'
  | 'outline-blue'
  | 'blue'
  | 'white'
  | 'outline-white';

export interface ISpinnerProps extends HTMLAttributes<HTMLDivElement> {
  color?: TSpinnerColor;
}
