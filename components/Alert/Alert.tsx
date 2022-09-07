import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './Alert.module.scss';
import { IAlertProps } from './Alert.types';

export const Alert: FC<IAlertProps> = ({ color = 'red', children }) => {
  const className = getClassName(classes.alert, classes[`alert--${color}`]);

  return <div className={className}>{children}</div>;
};
