import { TAvatarSize } from 'components/Avatar/Avatar.types';
import { IBlogMedium } from 'types';

export interface IBlogProps extends IBlogMedium {
  className?: string;
  avaratSize?: TAvatarSize;
  isLink?: boolean;
}
