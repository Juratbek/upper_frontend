import { FC } from 'react';
import { IIconProps, TNoop } from 'types';

import { ISubmenuProps, ISubmenuState } from '../ProfilePopover.types';

export interface IMenuListItem {
  icon: FC<IIconProps>;
  text: string;
  menu?: FC<ISubmenuProps>;
  // menu?: string;
  href?: string;
}

export interface IMenuListProps {
  closePopover: TNoop;
  itemClassName?: string;
  setSubmenu: (submenu: ISubmenuState) => void;
}
