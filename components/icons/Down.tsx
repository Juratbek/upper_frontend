import { IIconProps } from './types';

export const DownIcon = ({ width = 24, height = 24 }: IIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M6 9L12 15L18 9' stroke='#A2A4A5' strokeWidth='1.6' />
  </svg>
);
