import { TIconComponent } from 'components/icons';

export interface IFooterLink {
  text: string;
  url: string;
  target?: string;
}

export interface IMediaIcon {
  icon: TIconComponent;
  url: string;
}
