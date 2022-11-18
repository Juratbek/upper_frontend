import { TIcon } from 'types';

export interface INavigationIcon {
  icon: TIcon;
  href: string;
  tooltip: string;
  color?: string;
  private?: boolean;
  authNeeded?: boolean;
}
