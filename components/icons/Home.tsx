import { IIconProps } from './types';

export const HomeIcon = ({ color = 'black', width = 20, height = 20 }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <path
      d='M9 17V21.9997H5C3.89543 21.9997 3 21.1043 3 19.9997V10.0332C3 9.73801 3.13046 9.45786 3.35643 9.26786L10.7129 3.08228C11.4569 2.45664 12.5431 2.45665 13.2871 3.08228L20.6436 9.26786C20.8695 9.45786 21 9.73801 21 10.0332V20C21 21.1046 20.1046 22 19 22H15V17C15 13 9 13 9 17Z'
      fill={color}
    />
  </svg>
);
