import { FC, HTMLAttributes } from 'react';

import classes from './Clickable.module.scss';

export const Clickable: FC<HTMLAttributes<HTMLButtonElement>> = (props) => (
  <button className={classes.root}>{props.children}</button>
);
