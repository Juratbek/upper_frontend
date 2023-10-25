import { ICONS } from 'variables';

import { MENU_LIST_ITEMS } from './MenuList.constants';
import classes from './MenuList.module.scss';

const NextIcon = ICONS.next;

export const MenuList = (): JSX.Element => {
  return (
    <ul className={classes.list}>
      {MENU_LIST_ITEMS.map((item) => (
        <li key={item.text} className={`${classes.item} pointer`}>
          <span className={classes.icon}>
            <item.icon width={24} height={24} />
          </span>
          <p className={classes.text}>{item.text}</p>
          <span className={classes['next-icon']}>
            <NextIcon />
          </span>
        </li>
      ))}
    </ul>
  );
};
