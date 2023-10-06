import { CSSProperties } from 'react';

type TType = 'vertical' | 'horisontal';
type TColor = 'primary' | 'secondary';
export interface IDividerProps {
  className?: string;
  type?: TType;
  color?: TColor;
  style?: CSSProperties;
}
