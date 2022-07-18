import { HTMLAttributes } from 'react';

export interface IModalProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  isOpen: boolean;
  close: () => void;
}
