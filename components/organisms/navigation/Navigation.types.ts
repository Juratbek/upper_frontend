import { TIconComponent } from 'components/icons';
import { ReactNode } from 'react';

export interface INavigation {
  href: string;
  icon?: TIconComponent;
  text: string;
  badge?: ReactNode;
}
