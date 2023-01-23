import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './Alert.module.scss';
import { IAlertProps } from './Alert.types';

export const Alert: FC<IAlertProps> = ({ color = 'yellow', children, onClose, ...props }) => {
  const className = getClassName(classes.alert, classes[`alert--${color}`], props.className);

  return (
    <div className={className}>
      {onClose && (
        <span className={classes['close-icon']} onClick={onClose}>
          &#10005;
        </span>
      )}
      {children}
    </div>
  );
};
