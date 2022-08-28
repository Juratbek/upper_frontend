import { HTMLAttributes } from 'react';

export interface IDropdownProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  titleClassName?: string;
  dropdownClassName?: string;
}
