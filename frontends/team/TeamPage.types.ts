import { FC, HTMLAttributeAnchorTarget } from 'react';
import { IIconProps } from 'types';

export interface ITeamMember {
  name: string;
  imgUrl: string;
  position: string;
  links: {
    url: string;
    icon: FC<IIconProps>;
    target?: HTMLAttributeAnchorTarget;
  }[];
}
