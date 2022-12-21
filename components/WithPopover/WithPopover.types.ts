import { IButtonProps } from 'components/Button/Button.types';
import { ReactNode } from 'react';

export interface IWithPopoverProps extends IButtonProps {
  children: ReactNode;
  popover: ReactNode;
}
