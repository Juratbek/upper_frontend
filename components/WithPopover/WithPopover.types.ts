import { IButtonProps } from 'components';
import { ReactNode } from 'react';

export interface IWithPopoverProps extends IButtonProps {
  children: ReactNode;
  popover: ReactNode;
}
