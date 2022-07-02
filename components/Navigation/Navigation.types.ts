import { FC } from 'react';

interface IIconProp {
  color?: string;
}

export interface INavigationIcon {
  Icon: FC<IIconProp>;
  href: string;
  color?: string;
}
