import { FC } from 'react';

import classes from './Badge.module.scss';
import { IBadgeProp } from './Badge.types';

export const Badge: FC<IBadgeProp> = ({ children, color = 'blue' }) => {
  return <div className={`${classes.badge} ${classes[`badge--${color}`]}`}>{children}</div>;
};
