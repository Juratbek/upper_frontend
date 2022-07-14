export type TAvatarSize = 'small' | 'medium' | 'large' | 'extra-large';
export interface IAvatarProps {
  imgUrl: string;
  size?: TAvatarSize;
}
