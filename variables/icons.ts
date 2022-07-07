import {
  DeleteIcon,
  HomeIcon,
  MenuListIcon,
  NotificationIcon,
  PenIcon,
  SaveIcon,
  SearchIcon,
  UserIcon,
} from 'assets';
import { IIcon } from 'types';

export const ICON_TYPES = {
  delete: 'delete',
  save: 'save',
  home: 'gome',
  user: 'user',
  notification: 'notification',
  menuList: 'menuList',
  pen: 'pen',
  search: 'search',
};

export const ICONS: IIcon = {
  [ICON_TYPES.delete]: DeleteIcon,
  [ICON_TYPES.save]: SaveIcon,
  [ICON_TYPES.home]: HomeIcon,
  [ICON_TYPES.user]: UserIcon,
  [ICON_TYPES.notification]: NotificationIcon,
  [ICON_TYPES.menuList]: MenuListIcon,
  [ICON_TYPES.pen]: PenIcon,
  [ICON_TYPES.search]: SearchIcon,
};
