import { ReactNode } from 'react';

type TBadgeColor = 'blue' | 'outline-blue' | 'red';

export interface IBadgeProp {
  children?: ReactNode;
  color?: TBadgeColor;
  className?: string;
}
