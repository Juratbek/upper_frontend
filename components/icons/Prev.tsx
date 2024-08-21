import { IIconProps } from './types';

export const PrevIcon = ({ width = 24, height = 24, color = 'black' }: IIconProps) => (
  <svg role='icon' width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <path d='M15 6L9 12L15 18' stroke={color} strokeWidth='1.6' />
  </svg>
);
