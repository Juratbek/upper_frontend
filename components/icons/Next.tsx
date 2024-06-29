import { IIconProps } from './types';

export const NextIcon = ({ width = 24, height = 24, color = 'black' }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <path d='M9 18L15 12L9 6' stroke={color} strokeWidth='1.6' />
  </svg>
);
