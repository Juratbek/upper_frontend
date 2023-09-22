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
  HomeIcon,
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
import { TIcon, TIconComponent } from 'types';

export const ICON_TYPES = {
  delete: 'delete',
  save: 'save',
  home: 'gome',
  user: 'user',
  notification: 'notification',
  menuList: 'menuList',
  pen: 'pen',
  search: 'search',
  eye: 'eye',
  telegram: 'telegram',
  telegramColored: 'telegramColored',
  google: 'google',
  facebook: 'facebook',
  github: 'github',
  comment: 'comment',
  like: 'like',
  dislike: 'dislike',
  share: 'share',
  next: 'next',
  prev: 'prev',
  instagram: 'instagram',
  linkedIn: 'linkedIn',
  youtube: 'youtube',
  triangle: 'triangle',
  logOut: 'logOut',
  logo: 'logo',
  eyeSlash: 'eyeSlash',
  burger: 'burger',
  logoIcon: 'logoIcon',
  heart: 'heart',
  addFolder: 'addFolder',
  plus: 'plus',
  calendar: 'calendar',
  help: 'help',
  website: 'website',
  send: 'send',
  openExternal: 'openExternal',
  steps: 'steps',
  uploading: 'uploading',
  uploadError: 'uploadError',
  uploadSuccess: 'uploadSuccess',
  telegramChannel: 'telegramChannel',
};

export const SOCIAL_MEDIA_ICONS = [
  ICON_TYPES.telegram,
  ICON_TYPES.facebook,
  ICON_TYPES.github,
  ICON_TYPES.linkedIn,
  ICON_TYPES.youtube,
  ICON_TYPES.instagram,
  ICON_TYPES.website,
];

export const ICONS: Record<TIcon, TIconComponent> = {
  delete: DeleteIcon,
  save: SaveIcon,
  home: HomeIcon,
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
};
