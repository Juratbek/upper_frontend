import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './Spinner.module.scss';
import { ISpinnerProps } from './Spinner.types';

export const Spinner: FC<ISpinnerProps> = ({ color = 'dark', className }) => {
  const rootClassName = getClassName(classes.spinner, classes[`spinner--${color}`], className);
  return <div className={rootClassName} />;
};
