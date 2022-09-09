import { TIcon } from 'types';

export interface INavigationIcon {
  icon: TIcon;
  href: string;
  color?: string;
  private?: boolean;
  authNeeded?: boolean;
}
