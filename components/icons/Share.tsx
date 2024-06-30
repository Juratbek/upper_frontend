import { IIconProps } from './types';

export const ShareIcon = ({ width = 24, height = 24, color = 'black' }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <path
      d='M10.5959 13.3974L22.5997 2.78917M10.5959 13.3974L2.55763 8.95484C2.40182 8.86873 2.4277 8.63727 2.59868 8.5877L22.5997 2.78917M10.5959 13.3974L13.8261 21.7852C13.8902 21.9516 14.1235 21.9572 14.1956 21.7942L22.5997 2.78917'
      stroke={color}
      strokeWidth='1.6'
    />
  </svg>
);
