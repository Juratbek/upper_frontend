import { FC } from 'react';

import classes from './Error.module.scss';
import { IErrorProps } from './Error.types';

export const Error: FC<IErrorProps> = ({ error, message }) => {
  return error ? (
    <span className={classes.error}>
      {error.message ? error.message.toString() : message || 'Xato kiritilgan'}
    </span>
  ) : (
    <></>
  );
};
