import { HTMLAttributes } from 'react';

type TSize = 'small' | 'medium' | 'large';
export interface IModalProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  isOpen: boolean;
  size?: TSize;
  close: () => void;
  bodyClassName?: string;
}
