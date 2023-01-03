import { HTMLAttributeAnchorTarget } from 'react';
import { TIconComponent } from 'types';

export interface ITeamMember {
  name: string;
  imgUrl: string;
  position: string;
  links: {
    url: string;
    icon: TIconComponent;
    target?: HTMLAttributeAnchorTarget;
  }[];
}
