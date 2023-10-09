import { ButtonHTMLAttributes } from 'react';

export type TTabButtonColor = 'primary' | 'outlined';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TTabButtonColor;
}
