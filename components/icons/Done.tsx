import { IIconProps } from './types';

export const DoneIcon = ({ width = 16, height = 16, color = '#334155' }: IIconProps) => (
  <svg role='icon' width={width} height={height} viewBox='0 0 16 16' fill='none'>
    <path
      d='M13.3327 4L5.99935 11.3333L2.66602 8'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
