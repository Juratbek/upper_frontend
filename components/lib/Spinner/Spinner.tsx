import { FC } from 'react';
import { getClassName } from 'utils/common';

import classes from './Spinner.module.scss';
import { ISpinnerProps } from './Spinner.types';

export const Spinner: FC<ISpinnerProps> = ({ color = 'dark', className, style }) => {
  const rootClassName = getClassName(classes.spinner, classes[`spinner--${color}`], className);
  return <div role='spinner' className={rootClassName} style={style} />;
};
