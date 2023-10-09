import {
  AddFolderIcon,
  BurgerIcon,
  CalendarIcon,
  CommentIcon,
  DeleteIcon,
  DislikeIcon,
  EyeIcon,
  EyeSlashIcon,
  FacebookIcon,
  GitHubIcon,
  GoogleIcon,
  HeartIcon,
  HelpIcon,
  Home,
  InstagramIcon,
  LikeIcon,
  LinkedInIcon,
  Logo,
  LogoIcon,
  LogOutIcon,
  MenuListIcon,
  NextIcon,
  NotificationIcon,
  OpenExternal,
  PenIcon,
  PlusIcon,
  PrevIcon,
  SaveIcon,
  SearchIcon,
  SendIcon,
  ShareIcon,
  Steps,
  TelegramChannel,
  TelegramColoredIcon,
  TelegramIcon,
  TringleIcon,
  UploadError,
  Uploading,
  UploadSuccess,
  UserIcon,
  WebsiteIcon,
  YouTubeIcon,
} from 'assets';
import { FC } from 'react';
import { IIconProps } from 'types';

export const ICONS = {
  delete: DeleteIcon,
  save: SaveIcon,
  home: Home,
  user: UserIcon,
  notification: NotificationIcon,
  menuList: MenuListIcon,
  pen: PenIcon,
  search: SearchIcon,
  eye: EyeIcon,
  telegram: TelegramIcon,
  telegramColored: TelegramColoredIcon,
  google: GoogleIcon,
  facebook: FacebookIcon,
  github: GitHubIcon,
  comment: CommentIcon,
  like: LikeIcon,
  dislike: DislikeIcon,
  share: ShareIcon,
  next: NextIcon,
  prev: PrevIcon,
  instagram: InstagramIcon,
  linkedIn: LinkedInIcon,
  youtube: YouTubeIcon,
  triangle: TringleIcon,
  logOut: LogOutIcon,
  logo: Logo,
  eyeSlash: EyeSlashIcon,
  burger: BurgerIcon,
  logoIcon: LogoIcon,
  heart: HeartIcon,
  addFolder: AddFolderIcon,
  plus: PlusIcon,
  calendar: CalendarIcon,
  help: HelpIcon,
  website: WebsiteIcon,
  send: SendIcon,
  openExternal: OpenExternal,
  steps: Steps,
  uploading: Uploading,
  uploadError: UploadError,
  uploadSuccess: UploadSuccess,
  telegramChannel: TelegramChannel,
} satisfies Record<string, FC<IIconProps>>;
