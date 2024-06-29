import * as icons from 'assets';
import { FC } from 'react';
import { IIconProps } from 'types';

export const ICONS = {
  telegramColored: icons.TelegramColoredIcon,
  next: icons.Next,
  prev: icons.Prev,
  instagram: icons.InstagramIcon,
  linkedIn: icons.LinkedIn,
  youtube: icons.YouTubeIcon,
  triangle: icons.TringleIcon,
  logOut: icons.LogOut,
  logo: icons.Logo,
  burger: icons.BurgerIcon,
  logoIcon: icons.LogoIcon,
  heart: icons.HeartIcon,
  addFolder: icons.AddFolderIcon,
  plus: icons.Plus,
  calendar: icons.CalendarIcon,
  help: icons.HelpIcon,
  website: icons.WebsiteIcon,
  send: icons.Send,
  openExternal: icons.OpenExternal,
  steps: icons.Steps,
  uploading: icons.Uploading,
  uploadError: icons.UploadError,
  uploadSuccess: icons.UploadSuccess,
  telegramChannel: icons.TelegramChannel,
} satisfies Record<string, FC<IIconProps>>;
