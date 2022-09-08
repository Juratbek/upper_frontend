import { FC } from 'react';

import classes from './Error.module.scss';
import { IErrorProps } from './Error.types';

export const Error: FC<IErrorProps> = ({ error }) => {
  return error ? (
    <span className={classes.error}>
      {error.message ? JSON.stringify(error.message) : 'Xato kiritilgan'}
    </span>
  ) : (
    <></>
  );
};
