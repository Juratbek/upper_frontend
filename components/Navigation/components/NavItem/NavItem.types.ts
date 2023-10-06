import { FC, HTMLAttributes, ReactNode } from 'react';
import { IIconProps } from 'types';

export interface INavItemProps extends HTMLAttributes<HTMLDivElement> {
  icon: FC<IIconProps>;
  active?: boolean;
  badge?: ReactNode;
}
