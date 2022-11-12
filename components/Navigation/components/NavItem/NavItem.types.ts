import { HTMLAttributes, ReactNode } from 'react';
import { TIconComponent } from 'types';

export interface INavItemProps extends HTMLAttributes<HTMLDivElement> {
  icon: TIconComponent;
  active?: boolean;
  badge?: ReactNode;
}
