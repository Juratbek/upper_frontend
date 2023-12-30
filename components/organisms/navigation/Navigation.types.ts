import { ReactNode } from 'react';
import { TIconComponent } from 'types';

export interface INavigation {
  href: string;
  icon?: TIconComponent;
  text: string;
  badge?: ReactNode;
}
