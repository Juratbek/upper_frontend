import { ButtonHTMLAttributes } from 'react';

export type TButtonSize = 'small' | 'medium';

export type TButtonColor =
  | 'dark'
  | 'outline-dark'
  | 'light'
  | 'outline-red'
  | 'blue'
  | 'outline-blue'
  | 'white'
  | 'outline-white';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TButtonColor;
  loading?: boolean;
  size?: TButtonSize;
}
