import * as dark from 'public/icons/congrats-dark.json';
import * as light from 'public/icons/congrats-light.json';
import { FC } from 'react';
import Lottie from 'react-lottie';

import { ILottieIconProps } from './LottieIcon.types';

export const LottieIcon: FC<ILottieIconProps> = ({ height, width, isDark }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: isDark ? dark : light,
    rendereSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} width={width} height={height} />;
};
