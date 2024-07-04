import { IIconProps } from 'components/icons';
import { FC } from 'react';

export interface IContact {
  icon: FC<IIconProps>;
  link: string;
  text: string;
}
