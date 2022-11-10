import { HTMLAttributes } from 'react';

export type TAlertColor = 'red' | 'yellow' | 'green';

export interface IAlertProps extends HTMLAttributes<HTMLDivElement> {
  color?: TAlertColor;
  onClose?: () => void;
}
