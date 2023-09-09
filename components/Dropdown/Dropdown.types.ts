import { HTMLAttributes } from 'react';

type TIcon = 'small' | 'medium' | 'large';
export interface IDropdownProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  titleClassName?: string;
  iconSize?: TIcon;
  isOpen?: boolean;
  paddingLeft: string;
}
