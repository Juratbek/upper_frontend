import { DeleteIcon, EyeIcon } from 'assets';
import { ACTION_TYPES } from 'variables/common';

import { IActions } from './Actions.types';

export const ACTIONS: IActions = {
  [ACTION_TYPES.delete]: {
    Icon: DeleteIcon,
    label: 'O`chirish',
  },
  [ACTION_TYPES.markAsRead]: {
    Icon: EyeIcon,
    label: 'O`qilgan sifatida belgilash',
  },
  [ACTION_TYPES.notInterested]: {
    label: 'Qiziq emas',
  },
  [ACTION_TYPES.report]: {
    label: 'Habar berish',
  },
};
