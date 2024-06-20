import { HTMLAttributes } from 'react';

export type TSpinnerVariant = 'primary' | 'secondary' | 'danger';

export interface ISpinnerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: TSpinnerVariant;
}
