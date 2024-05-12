import { CSSProperties, ReactNode } from 'react';

type TColor = 'red';
export interface IAction {
  label: ReactNode;
  color?: TColor;
  onClick?: VoidFunction;
}

export interface IActinosProps {
  actions: IAction[];
  popupStyle?: CSSProperties;
  dotsClassName?: string;
  loading?: boolean;
}
