import { DeleteIcon, EyeIcon } from 'assets';

export const ACTION_TYPES = {
  delete: 'delete',
  markAsRead: 'markAsRead',
};

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
