import { TIconComponent } from 'components/icons';
import { ReactNode } from 'react';

export interface INavItemProps {
  active?: boolean;
  icon?: TIconComponent;
  text: ReactNode;
  href: string;
  className?: string;
  badge?: ReactNode;
}
