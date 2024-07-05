import { IIconProps } from 'components/icons';
import { FC, HTMLAttributeAnchorTarget } from 'react';

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
