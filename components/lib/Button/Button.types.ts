import { ButtonHTMLAttributes, ReactNode } from 'react';

export type TButtonSize = 'small' | 'medium';

export type TButtonColor = 'primary' | 'secondary' | 'tertiary' | 'outlined';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TButtonColor;
  loading?: boolean;
  loader?: (() => ReactNode) | ReactNode;
  size?: TButtonSize;
}
