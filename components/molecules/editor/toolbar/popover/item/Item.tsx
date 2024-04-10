import { memo } from 'react';

import classes from './Item.module.scss';
import { IItemProps } from './Item.types';

export const Item = memo(function Component({ toolbar, type, onClick }: IItemProps) {
  const { icon, text } = toolbar;
  return (
    <button className={classes.btn} onClick={() => onClick(type)}>
      <span className={classes.icon} dangerouslySetInnerHTML={{ __html: icon }} />
      {text}
    </button>
  );
});
