import { IIconProps } from 'components/icons';
import { FC } from 'react';
import { TNoop } from 'types';

import { ISubmenuProps, ISubmenuState } from '../ProfilePopover.types';

export interface IMenuListItem {
  icon: FC<IIconProps>;
  text: string;
  menu?: FC<ISubmenuProps>;
  href?: string;
}

export interface IMenuListProps {
  closePopover: TNoop;
  itemClassName?: string;
  setSubmenu: (submenu: ISubmenuState) => void;
}
