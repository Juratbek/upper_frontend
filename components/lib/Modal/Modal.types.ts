import { HTMLAttributes, ReactNode } from 'react';

type TColor = 'outline-red';

export interface IModalProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  isOpen: boolean;
  close: VoidFunction;
  bodyClassName?: string;
  color?: TColor;
  footer?: ReactNode;
}
