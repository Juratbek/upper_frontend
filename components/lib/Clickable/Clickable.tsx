import { ButtonHTMLAttributes, FC } from 'react';

import { Spinner } from '../Spinner';
import classes from './Clickable.module.scss';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Clickable: FC<IProps> = ({ children, className, loading, ...props }) => (
  <button className={`${classes.root} ${className}`} {...props}>
    {loading ? <Spinner /> : children}
  </button>
);
