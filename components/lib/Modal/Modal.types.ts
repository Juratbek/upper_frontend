import { HTMLAttributes } from 'react';

type TSize = 'small' | 'medium' | 'large';
type TColor = 'outline-red';

export interface IModalProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  isOpen: boolean;
  size?: TSize;
  close: () => void;
  bodyClassName?: string;
  color?: TColor;
}
