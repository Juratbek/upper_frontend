import { ButtonHTMLAttributes } from 'react';

type TButtonColor = 'dark' | 'outline-dark';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TButtonColor;
}
