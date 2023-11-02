import { Status } from 'components/lib';
import Link from 'next/link';
import { FC } from 'react';
import { toDateString } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

import classes from './Tutorial.module.scss';
import { ITutorialProps } from './Tutorial.types';

export const Tutorial: FC<ITutorialProps> = ({ id, name, status, className, publishedDate }) => {
  return (
    <Link
      href={`${WEB_APP_ROOT_DIR}/user/tutorials/${id}`}
      className={`${classes.container} ${className}`}
    >
      <div className={classes.body}>
        <h2 className='my-1'>{name}</h2>
        <Status status={status} />
      </div>
      <div className={classes.footer}>
        <span className={classes.stats}>
          <strong>{toDateString(publishedDate)}</strong>
        </span>
      </div>
    </Link>
  );
};
