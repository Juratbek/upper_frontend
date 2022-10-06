import { ButtonHTMLAttributes } from 'react';

export type TButtonColor =
  | 'dark'
  | 'outline-dark'
  | 'light'
  | 'outline-red'
  | 'blue'
  | 'outline-blue';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TButtonColor;
  loading?: boolean;
}
