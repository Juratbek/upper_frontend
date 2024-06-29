import * as icons from 'assets';
import { FC } from 'react';
import { IIconProps } from 'types';

export const ICONS = {
  telegramColored: icons.TelegramColoredIcon,
  logoIcon: icons.LogoIcon,
  plus: icons.Plus,
  send: icons.Send,
  uploading: icons.Uploading,
  uploadError: icons.UploadError,
  uploadSuccess: icons.UploadSuccess,
  telegramChannel: icons.TelegramChannel,
} satisfies Record<string, FC<IIconProps>>;
