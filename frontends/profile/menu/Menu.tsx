import { Link } from 'components/lib';
import { FC } from 'react';
import { ICONS } from 'variables';

import { menu } from './Menu.constants';
import classes from './Menu.module.scss';

const NextIcon = ICONS.next;

export const Menu: FC = () => {
  return (
    <div className={classes.root}>
      {menu.map((item) => (
        <Link href={item.path} key={item.text} className={classes.item}>
          <span className={classes['item-body']}>
            <item.icon width={24} height={24} />
            {item.text}
          </span>
          <span className={classes.icon}>
            <NextIcon />
          </span>
        </Link>
      ))}
    </div>
  );
};
