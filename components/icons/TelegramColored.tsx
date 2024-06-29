import { IIconProps } from './types';

export const TelegramColoredIcon = ({ width = 20, height = 20 }: IIconProps) => (
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
