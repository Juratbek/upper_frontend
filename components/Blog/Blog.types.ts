import { TAvatarSize } from 'components/Avatar/Avatar.types';
import { IBlogMedium, ILink } from 'types';

export interface IBlogProps extends IBlogMedium {
  className?: string;
  avatarSize?: TAvatarSize;
  isLink?: boolean;
  links?: ILink[];
}
