import { FC } from 'react';
import { IIconProps } from 'types';

export interface IMenuListItem {
  icon: FC<IIconProps>;
  text: string;
  href?: string;
}
