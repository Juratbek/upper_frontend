import { FC } from 'react';
import { ICONS } from 'variables/icons';

import classes from './Plus.module.scss';

const PlusIcon = ICONS.plus;

export const Plus: FC<{ onClick: VoidFunction }> = ({ onClick }) => (
  <button className={classes.btn} onClick={onClick}>
    <PlusIcon width={32} height={32} strokeWidth={3} />
  </button>
);
