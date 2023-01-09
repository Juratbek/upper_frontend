import { FC } from 'react';

import classes from './Badge.module.scss';
import { IBadgeProp } from './Badge.types';

export const Badge: FC<IBadgeProp> = ({ children, color = 'blue' }) => {
  const badgeColorClassName = classes[`badge--${color}`];

  return <div className={`${classes.badge} ${badgeColorClassName}`}>{children}</div>;
};
