export type TAvatarSize = 'micro' | 'small' | 'medium' | 'large' | 'extra-large';

export interface IAvatarProps {
  imgUrl?: string;
  size?: TAvatarSize;
  className?: string;
  zoomable?: boolean;
}
