import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './Status.module.scss';
import { IStatusProps } from './Status.types';

export const Status: FC<IStatusProps> = ({ status, className, children }) => {
  const rootClassName = getClassName(classes.root, classes[status.toLowerCase()], className);

  return <span className={rootClassName}>{children}</span>;
};
