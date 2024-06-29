import { FC } from 'react';
import { IIconProps } from 'types';

export const TelegramColoredIcon: FC<IIconProps> = ({ width = 20, height = 20 }) => (
  <svg width={width} height={height} viewBox='0 0 27 27' fill='none'>
    <g clipPath='url(#clip0_1501_342)'>
      <path
        d='M27 13.5C27 20.9587 20.9587 27 13.5 27C6.04125 27 0 20.9587 0 13.5C0 6.04125 6.04125 0 13.5 0C20.9587 0 27 6.04125 27 13.5Z'
        fill='url(#paint0_linear_1501_342)'
      />
      <path
        d='M11.0246 19.6874C10.5859 19.6874 10.6646 19.5187 10.5071 19.1024L9.22461 14.8724L17.1896 9.8999L18.1234 10.1474L17.3471 12.2624L11.0246 19.6874Z'
        fill='#C8DAEA'
      />
      <path
        d='M11.0254 19.6876C11.3629 19.6876 11.5091 19.5301 11.7004 19.3501C11.9929 19.0688 15.7504 15.4126 15.7504 15.4126L13.4441 14.8501L11.3066 16.2001L11.0254 19.5751V19.6876Z'
        fill='#A9C9DD'
      />
      <path
        d='M11.2497 16.2448L16.6947 20.2611C17.3134 20.5986 17.7634 20.4298 17.9209 19.6873L20.1372 9.24731C20.3622 8.33606 19.7884 7.93106 19.1922 8.20106L6.18719 13.2186C5.29844 13.5786 5.30969 14.0736 6.02969 14.2873L9.37094 15.3336L17.0997 10.4623C17.4597 10.2373 17.7972 10.3611 17.5272 10.6086L11.2497 16.2448Z'
        fill='url(#paint1_linear_1501_342)'
      />
    </g>
    <defs>
      <linearGradient
        id='paint0_linear_1501_342'
        x1='17.4566'
        y1='4.26713'
        x2='10.7066'
        y2='20.0169'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#37AEE2' />
        <stop offset='1' stopColor='#1E96C8' />
      </linearGradient>
      <linearGradient
        id='paint1_linear_1501_342'
        x1='14.5112'
        y1='13.9222'
        x2='17.3237'
        y2='18.4222'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#EFF7FC' />
        <stop offset='1' stopColor='white' />
      </linearGradient>
      <clipPath id='clip0_1501_342'>
        <rect width='27' height='27' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

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

export const LogoIcon: FC<IIconProps> = ({ color = 'black' }) => (
  <svg viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='2.5' y='2.5' width='75' height='75' stroke={color} strokeWidth='7' />
    <path
      d='M49.8324 21.9091H54.3239V46.4673C54.3239 49.0028 53.7262 51.2667 52.5309 53.2589C51.3477 55.239 49.6754 56.8026 47.5142 57.9496C45.353 59.0845 42.8175 59.652 39.9077 59.652C36.9979 59.652 34.4624 59.0845 32.3011 57.9496C30.1399 56.8026 28.4616 55.239 27.2663 53.2589C26.0831 51.2667 25.4915 49.0028 25.4915 46.4673V21.9091H29.983V46.1051C29.983 47.9162 30.3814 49.5281 31.1783 50.9407C31.9751 52.3413 33.1101 53.446 34.5831 54.255C36.0682 55.0518 37.843 55.4503 39.9077 55.4503C41.9723 55.4503 43.7472 55.0518 45.2322 54.255C46.7173 53.446 47.8523 52.3413 48.6371 50.9407C49.434 49.5281 49.8324 47.9162 49.8324 46.1051V21.9091Z'
      fill={color}
    />
  </svg>
);

export const Plus: FC<IIconProps> = ({
  width = 24,
  height = 24,
  color = 'black',
  strokeWidth = 2,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox='0 0 44 44'
    fill='none'
  >
    <path
      d='M22 14.6667V29.3334'
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap='square'
      strokeLinejoin='round'
    />
    <path
      d='M14.6641 22H29.3307'
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap='square'
      strokeLinejoin='round'
    />
  </svg>
);

export const Uploading: FC<IIconProps> = ({ color = 'black', width = 20, height = 20 }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <g>
      <path
        d='M12 16V10M12 10L9 12M12 10L15 12M23 15C23 12.7909 21.2091 11 19 11C18.9764 11 18.9532 11.0002 18.9297 11.0006C18.4447 7.60802 15.5267 5 12 5C9.20335 5 6.79019 6.64004 5.66895 9.01082C3.06206 9.18144 1 11.3498 1 13.9999C1 16.7613 3.23858 19.0001 6 19.0001L19 19C21.2091 19 23 17.2091 23 15Z'
        stroke={color}
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </svg>
);

export const UploadError: FC<IIconProps> = ({ color = 'black', width = 20, height = 20 }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <g>
      <path
        d='M19 19H6C3.23858 19 1 16.7614 1 14C1 11.35 3.06162 9.18137 5.6685 9.01074C6.00446 8.30038 6.45733 7.65576 7.00088 7.10107M19 19L5 5M19 19L21 21M10 5.28988C10.6337 5.10128 11.305 5 12 5C15.5267 5 18.4442 7.60802 18.9292 11.0006C18.9528 11.0002 18.9773 11 19.001 11C21.2101 11 22.9995 12.7909 22.9995 15C22.9995 15.9459 22.672 16.8152 22.123 17.5'
        stroke={color}
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </svg>
);

export const UploadSuccess: FC<IIconProps> = ({ color = 'black', width = 20, height = 20 }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <g>
      <path
        d='M15 11L11 15L9 13M23 15C23 12.7909 21.2091 11 19 11C18.9764 11 18.9532 11.0002 18.9297 11.0006C18.4447 7.60802 15.5267 5 12 5C9.20335 5 6.79019 6.64004 5.66895 9.01082C3.06206 9.18144 1 11.3498 1 13.9999C1 16.7613 3.23858 19.0001 6 19.0001L19 19C21.2091 19 23 17.2091 23 15Z'
        stroke={color}
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </svg>
);

export const TelegramChannel: FC<IIconProps> = ({ color = 'black', width = 20, height = 22 }) => (
  <svg
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

export const Send: FC<IIconProps> = ({ width = 24, height = 24, color = '#007AFF' }) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
    <path
      d='M20.9972 11.0896L2.82483 2.82947C2.07389 2.48813 1.2559 3.15153 1.43484 3.95676L2.68318 9.5743C2.87191 10.4236 3.58804 11.0535 4.45448 11.1322L14 12L4.45448 12.8678C3.58804 12.9465 2.87191 13.5764 2.68318 14.4257L1.43484 20.0432C1.2559 20.8485 2.07389 21.5119 2.82483 21.1705L20.9972 12.9104C21.7788 12.5551 21.7788 11.4449 20.9972 11.0896Z'
      fill={color}
    />
  </svg>
);
