import { FC } from 'react';
import { getClassName } from 'utils';

import { STATUS_LABELS } from './ArticleStatus.constants';
import classes from './ArticleStatus.module.scss';
import { IArticleStatusProps } from './ArticleStatus.types';

export const ArticleStatus: FC<IArticleStatusProps> = ({ status, className, children }) => {
  const rootClassName = getClassName(className, classes.container);
  const label = STATUS_LABELS[status];

  return (
    <div className={rootClassName}>
      <p className='m-0'>
        <span>Maqola holati: </span>
        <span className={classes[status.toLocaleLowerCase()]}>{label.toUpperCase()}</span>
      </p>
      {children && <div>{children}</div>}
    </div>
  );
};
