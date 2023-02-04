import { ReactNode } from 'react';

type TBadgeColor = 'blue' | 'outline-blue' | 'white';

export interface IBadgeProp {
  children?: ReactNode;
  color?: TBadgeColor;
}
