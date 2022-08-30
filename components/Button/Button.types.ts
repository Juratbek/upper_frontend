import { ButtonHTMLAttributes } from 'react';

export type TButtonColor = 'dark' | 'outline-dark' | 'light' | 'outline-red';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TButtonColor;
}
