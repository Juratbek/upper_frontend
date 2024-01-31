import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './Badge.module.scss';
import { IBadgeProp } from './Badge.types';

export const Badge: FC<IBadgeProp> = ({ children, color = 'blue', className }) => {
  const rootClassName = getClassName(className, classes[`badge--${color}`], classes.badge);

  return <div className={rootClassName}>{children}</div>;
};
