import { TIcon } from 'types';

export interface INavigation {
  href: string;
  icon?: TIcon;
  text: string;
  active?: boolean;
}
