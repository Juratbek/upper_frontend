import { DeleteIcon, EyeIcon } from 'assets';
import { ACTION_TYPES } from 'variables';

export const ACTIONS = {
  [ACTION_TYPES.delete]: {
    Icon: DeleteIcon,
    label: 'O`chirish',
  },
  [ACTION_TYPES.markAsRead]: {
    Icon: EyeIcon,
    label: 'O`qilgan sifatida belgilash',
  },
};
