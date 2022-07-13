type TAvatarSize = 'small' | 'medium' | 'large';
export interface IAvatarProps {
  imgUrl: string;
  size?: TAvatarSize;
}
