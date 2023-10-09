import { CSSProperties } from 'react';

type TType = 'vertical' | 'horisontal';
type TColor = 'primary' | 'secondary' | 'tertiary';

export interface IDividerProps {
  className?: string;
  my?: number;
  type?: TType;
  color?: TColor;
  style?: CSSProperties;
}
