import { ReactNode } from 'react';
import { TIconComponent } from 'types';

export interface INavItemProps {
  active?: boolean;
  icon?: TIconComponent;
  text: ReactNode;
  href: string;
  className?: string;
}
