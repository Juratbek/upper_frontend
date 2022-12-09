export type TAvatarSize = 'small' | 'medium' | 'large' | 'extra-large' | 'xxl' | 'immense';
export interface IAvatarProps {
  imgUrl: string;
  size?: TAvatarSize;
  className?: string;
}
