import * as icons from 'assets';
import { FC } from 'react';
import { IIconProps } from 'types';

export const ICONS = {
  delete: icons.DeleteIcon,
  home: icons.Home,
  user: icons.UserIcon,
  notification: icons.Notification,
  menuList: icons.MenuListIcon,
  pen: icons.Pen,
  search: icons.SearchIcon,
  eye: icons.EyeIcon,
  telegram: icons.Telegram,
  telegramColored: icons.TelegramColoredIcon,
  google: icons.GoogleIcon,
  facebook: icons.FacebookIcon,
  github: icons.GitHubIcon,
  comment: icons.CommentIcon,
  like: icons.Like,
  dislike: icons.Dislike,
  share: icons.Share,
  next: icons.NextIcon,
  prev: icons.Prev,
  instagram: icons.InstagramIcon,
  linkedIn: icons.LinkedIn,
  youtube: icons.YouTubeIcon,
  triangle: icons.TringleIcon,
  logOut: icons.LogOut,
  logo: icons.Logo,
  eyeSlash: icons.EyeSlashIcon,
  burger: icons.BurgerIcon,
  logoIcon: icons.LogoIcon,
  heart: icons.HeartIcon,
  addFolder: icons.AddFolderIcon,
  plus: icons.PlusIcon,
  calendar: icons.CalendarIcon,
  help: icons.HelpIcon,
  website: icons.WebsiteIcon,
  send: icons.SendIcon,
  openExternal: icons.OpenExternal,
  steps: icons.Steps,
  uploading: icons.Uploading,
  uploadError: icons.UploadError,
  uploadSuccess: icons.UploadSuccess,
  telegramChannel: icons.TelegramChannel,
  books: icons.Books,
  write: icons.Write,
  save: icons.Save,
  settings: icons.Settings,
  loon: icons.Loon,
} satisfies Record<string, FC<IIconProps>>;
