import { FC } from 'react';
import { getClassName } from 'utils';

import { STATUS_LABELS } from './ArticleStatus.constants';
import classes from './ArticleStatus.module.scss';
import { IArticleStatusProps } from './ArticleStatus.types';

export const ArticleStatus: FC<IArticleStatusProps> = ({ status, className }) => {
  const rootClassName = getClassName(className, classes.container, classes[status.toLowerCase()]);
  const label = STATUS_LABELS[status];

  return <div className={rootClassName}>Stauts: {label.toUpperCase()}</div>;
};
