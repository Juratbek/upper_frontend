import { HTMLAttributes } from 'react';

type TAlertColor = 'red' | 'yellow';

export interface IAlertProps extends HTMLAttributes<HTMLDivElement> {
  color?: TAlertColor;
}
