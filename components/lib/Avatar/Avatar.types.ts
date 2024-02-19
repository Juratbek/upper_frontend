export type TAvatarSize = 'micro' | 'small' | 'medium' | 'extra-large';

export interface IAvatarProps {
  imgUrl?: string;
  size?: TAvatarSize;
  className?: string;
  zoomable?: boolean;
  test?: string;
}
