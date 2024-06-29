import { NextIcon } from 'components/icons';
import { Link } from 'components/lib';
import { useTheme } from 'hooks';
import { FC, useCallback } from 'react';

import { MENU_LIST_ITEMS } from './MenuList.constants';
import classes from './MenuList.module.scss';
import { IMenuListItem, IMenuListProps } from './MenuList.types';

export const MenuList: FC<IMenuListProps> = ({ closePopover, itemClassName, setSubmenu }) => {
  const renderItem = useCallback((item: IMenuListItem, className: string) => {
    const { menu, href } = item;
    const { themeColors } = useTheme();

    if (href) {
      return (
        <Link href={href} className={className} onClick={closePopover}>
          <span className={classes.icon}>
            <item.icon width={24} height={24} color={themeColors.icon} />
          </span>
          <p className={classes.text}>{item.text}</p>
          <span className={classes['next-icon']}>
            <NextIcon color={themeColors.icon} />
          </span>
        </Link>
      );
    }

    if (menu) {
      return (
        <span
          className={className}
          onClick={(): void => setSubmenu({ Component: menu, isShown: true })}
        >
          <span>
            <item.icon color={themeColors.icon} width={24} height={24} />
          </span>
          <p className={classes.text}>{item.text}</p>
          <span className={classes['next-icon']}>
            <NextIcon color={themeColors.icon} />
          </span>
        </span>
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
