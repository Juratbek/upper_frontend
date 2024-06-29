import { FC } from 'react';
import { IIconProps } from 'types';

export const DotsIcon: FC<IIconProps> = () => (
  <svg viewBox='0 0 19 5' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='2.5' cy='2.5' r='2.5' fill='#4D4D4D' />
    <circle cx='9.5' cy='2.5' r='2.5' fill='#4D4D4D' />
    <circle cx='16.5' cy='2.5' r='2.5' fill='#4D4D4D' />
  </svg>
);

export const Spinner: FC<IIconProps> = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width='214px'
    height='214px'
    viewBox='0 0 100 100'
    preserveAspectRatio='xMidYMid'
  >
    <path d='M25 50A25 25 0 0 0 75 50A25 26.5 0 0 1 25 50' fill='#93dbe9' stroke='none'>
      <animateTransform
        attributeName='transform'
        type='rotate'
        dur='0.8928571428571428s'
        repeatCount='indefinite'
        keyTimes='0;1'
        values='0 50 50.75;360 50 50.75'
      ></animateTransform>
    </path>
  </svg>
);
