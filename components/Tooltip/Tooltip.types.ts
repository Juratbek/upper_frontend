import { ReactNode } from 'react';

export interface ITooltipProps {
  children: ReactNode;
  tooltip: string;
  invisible?: boolean;
}
