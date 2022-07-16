import { ButtonHTMLAttributes } from 'react';

export interface ILabelProps extends ButtonHTMLAttributes<HTMLSpanElement> {
  href?: number;
}
