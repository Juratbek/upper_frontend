import { ButtonHTMLAttributes } from 'react';

type TLabelColor = 'dark' | 'outline-dark' | 'red' | 'outline-red';
export interface ILabelProps extends ButtonHTMLAttributes<HTMLSpanElement> {
  href?: number;
  color?: TLabelColor;
}
