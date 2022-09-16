import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './Alert.module.scss';
import { IAlertProps } from './Alert.types';

export const Alert: FC<IAlertProps> = ({ color = 'yellow', children, ...props }) => {
  const className = getClassName(classes.alert, classes[`alert--${color}`], props.className);

  return <div className={className}>{children}</div>;
};
