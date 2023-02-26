import { Label, Status } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { toDateString } from 'utils';

import classes from './Tutorial.module.scss';
import { ITutorialProps } from './Tutorial.types';

export const Tutorial: FC<ITutorialProps> = ({
  id,
  name,
  labels = [],
  status,
  className,
  publishedDate,
}) => {
  return (
    <Link href={`user/tutorials/${id}`}>
      <a className={`${classes.container} ${className}`}>
        <div className={classes.body}>
          <h2 className='my-1'>{name}</h2>
          <Status status={status} />
        </div>
        <div className={classes.footer}>
          <span className={classes.stats}>
            <strong>{toDateString(publishedDate)}</strong>
          </span>
          <div className={classes.labels}>
            {labels?.map((label) => (
              <span
                key={label.id}
                style={{ marginLeft: '.3rem', marginBottom: '0.3rem', display: 'inline-block' }}
              >
                <Label>{label.name}</Label>
              </span>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};
