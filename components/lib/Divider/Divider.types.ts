import { CSSProperties } from 'react';

type TType = 'vertical' | 'horisontal';
type TColor = 'transparent' | 'medium-gray' | 'light-gray';
export interface IDividerProps {
  className?: string;
  type?: TType;
  color?: TColor;
  style?: CSSProperties;
}
