import { FC } from 'react';
import { IIconProps } from 'types';

export interface IContact {
  icon: FC<IIconProps>;
  link: string;
  text: string;
}
