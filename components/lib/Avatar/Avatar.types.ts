export type TAvatarSize = 'micro' | 'small' | 'medium' | 'extra-large';

export interface IAvatarProps {
  imgUrl?: string;
  name: string;
  size?: TAvatarSize;
  className?: string;
  zoomable?: boolean;
  isLocal?: boolean;
}
