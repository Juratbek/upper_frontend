import { Link } from 'components/lib';
import { FC, useCallback } from 'react';
import { TNoop } from 'types';
import { ICONS } from 'variables';

import { MENU_LIST_ITEMS } from './MenuList.constants';
import classes from './MenuList.module.scss';
import { IMenuListItem } from './MenuList.types';

const NextIcon = ICONS.next;

export const MenuList: FC<{ closePopover: TNoop; itemClassName?: string }> = ({
  closePopover,
  itemClassName,
}) => {
  const renderItem = useCallback((item: IMenuListItem, className: string) => {
    if (item.href) {
      return (
        <Link href={item.href} className={className} onClick={closePopover}>
          <span className={classes.icon}>
            <item.icon width={24} height={24} />
          </span>
          <p className={classes.text}>{item.text}</p>
          <span className={classes['next-icon']}>
            <NextIcon />
          </span>
        </Link>
      );
    }

    return (
      <span className={className}>
        <span>
          <item.icon width={24} height={24} />
        </span>
        <p className={classes.text}>{item.text}</p>
        <span className={classes['next-icon']}>
          <NextIcon />
        </span>
      </span>
    );
  }, []);

  return (
    <ul className={classes.list}>
      {MENU_LIST_ITEMS.map((item) => (
        <li key={item.text}>{renderItem(item, `${classes.item} pointer ${itemClassName}`)}</li>
      ))}
    </ul>
  );
};
