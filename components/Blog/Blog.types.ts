import { TAvatarSize } from 'components/Avatar/Avatar.types';
import { IBlog } from 'types';

export interface IBlogProps extends IBlog {
  className?: string;
  avaratSize?: TAvatarSize;
  isLink?: boolean;
}
