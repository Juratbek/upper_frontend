import { IIconProps } from './types';

export const TelegramChannelIcon = ({ color = 'black', width = 20, height = 22 }: IIconProps) => (
  <svg
    role='icon'
    width={width}
    height={height}
    viewBox='0 0 40 44'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g filter='url(#filter0_d_1609_2)'>
      <path
        d='M15 23.3332L29.8833 27.0998L32.9333 27.8665C33.1829 27.9283 33.4434 27.9315 33.6944 27.876C33.9454 27.8204 34.1802 27.7075 34.3803 27.5461C34.5804 27.3847 34.7405 27.1792 34.848 26.9456C34.9555 26.7121 35.0075 26.4568 35 26.1998V7.13315C34.9998 6.88035 34.9421 6.6309 34.8313 6.40369C34.7204 6.17649 34.5593 5.97747 34.3602 5.82171C34.1611 5.66595 33.9292 5.55752 33.682 5.50464C33.4347 5.45176 33.1787 5.45581 32.9333 5.51649L29.8833 6.28315L15 9.99982M15 23.3332V9.99982M15 23.3332H11.6667M15 23.3332V33.3332C15 33.7752 14.8244 34.1991 14.5118 34.5117C14.1993 34.8242 13.7754 34.9998 13.3333 34.9998H11.4C11.0101 35.0077 10.6298 34.8786 10.3252 34.6349C10.0207 34.3913 9.81125 34.0486 9.73333 33.6665L7.35 21.7498C8.5556 22.7728 10.0855 23.334 11.6667 23.3332M15 9.99982H11.6667C9.89856 9.99982 8.20286 10.7022 6.95262 11.9524C5.70238 13.2027 5 14.8984 5 16.6665C5.01156 17.6194 5.2273 18.5589 5.63269 19.4214C6.03807 20.2839 6.62367 21.0495 7.35 21.6665C8.54375 22.7196 10.0749 23.3108 11.6667 23.3332'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <filter
        id='filter0_d_1609_2'
        x='-4'
        y='0'
        width='48'
        height='48'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy='4' />
        <feGaussianBlur stdDeviation='2' />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1609_2' />
        <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1609_2' result='shape' />
      </filter>
    </defs>
  </svg>
);
