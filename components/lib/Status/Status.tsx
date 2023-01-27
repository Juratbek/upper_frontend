import { FC } from 'react';
import { TArticleStatus } from 'types';
import { getClassName } from 'utils';

import classes from './Status.module.scss';
import { IStatusProps, STATUS_LABELS } from './Status.types';

export const Status: FC<IStatusProps> = ({ status, className, children }) => {
  const rootClassName = getClassName(classes.root, classes[status.toLowerCase()], className);

  return <span className={rootClassName}>{STATUS_LABELS[children as TArticleStatus]}</span>;
};
