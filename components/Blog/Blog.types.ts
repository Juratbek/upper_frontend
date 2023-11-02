import { TAvatarSize } from 'components/lib';
import { IBlogMedium, ILink } from 'types';

export interface IBlogProps extends IBlogMedium {
  className?: string;
  avatarSize?: TAvatarSize;
  isLink?: boolean;
  links?: ILink[];
}
