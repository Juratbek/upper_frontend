import { ReactNode } from 'react';
import { TIcon } from 'types';

export interface INavigationIcon {
  icon: TIcon;
  href: string;
  tooltip: string;
  color?: string;
  private?: boolean;
  message?: ReactNode;
}
