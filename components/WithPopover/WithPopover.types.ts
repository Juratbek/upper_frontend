import { IButtonProps } from 'components/lib';
import { ReactNode } from 'react';

export interface IWithPopoverProps extends IButtonProps {
  children: ReactNode;
  popover: ReactNode;
}
