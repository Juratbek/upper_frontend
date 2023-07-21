import { ButtonHTMLAttributes, ReactNode } from 'react';

export type TButtonSize = 'small' | 'medium';

export type TButtonColor =
  | 'dark'
  | 'outline-dark'
  | 'light'
  | 'transparent'
  | 'outline-red'
  | 'blue'
  | 'outline-blue';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TButtonColor;
  loading?: boolean;
  loader?: (() => ReactNode) | ReactNode;
  size?: TButtonSize;
}
