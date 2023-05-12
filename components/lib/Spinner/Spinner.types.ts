import { HTMLAttributes } from 'react';

export type TSpinnerColor = 'dark' | 'light' | 'red';

export interface ISpinnerProps extends HTMLAttributes<HTMLDivElement> {
  color?: TSpinnerColor;
}
