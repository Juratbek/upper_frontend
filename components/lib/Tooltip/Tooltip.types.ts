import { ReactNode } from 'react';

type TTooltipPosition = 'right' | 'bottom' | 'left';
export interface ITooltipProps {
  children: ReactNode;
  tooltip: string;
  invisible?: boolean;
  position?: TTooltipPosition;
}
