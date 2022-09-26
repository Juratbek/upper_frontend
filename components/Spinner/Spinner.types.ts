import { HTMLAttributes } from 'react';

export type TSpinnerColor = 'dark' | 'outline-dark' | 'light' | 'outline-red';

export interface ISpinnerProps extends HTMLAttributes<HTMLDivElement> {
  color?: TSpinnerColor;
}
