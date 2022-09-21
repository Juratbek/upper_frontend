import { HTMLAttributes } from 'react';

export interface IDropdownProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  titleClassName?: string;
  isOpen?: boolean;
  paddingLeft: string;
}
