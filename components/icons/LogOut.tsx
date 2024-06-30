import { IIconProps } from './types';

export const LogOutIcon = ({ width = 24, height = 24, color = '#FF0000' }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <path
      d='M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9'
      stroke={color}
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M16 17L21 12L16 7'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M21 12H9'
      stroke={color}
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
