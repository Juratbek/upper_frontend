import { FC } from 'react';

import classes from './Spinner.module.scss';
import { ISpinnerProps } from './Spinner.types';

export const Spinner: FC<ISpinnerProps> = ({ color = 'dark' }) => {
  return <div className={`${classes.spinner} ${classes[`spinner--${color}`]}`} />;
};
