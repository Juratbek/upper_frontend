import { Link } from 'components/lib';
import { useTheme } from 'hooks';
import { FC } from 'react';
import { ICONS } from 'variables/icons';

import { menu } from './Menu.constants';
import classes from './Menu.module.scss';

const NextIcon = ICONS.next;

export const Menu: FC = () => {
  const { themeColors } = useTheme();

  return (
    <div className={classes.root}>
      {menu.map((item) => (
        <Link href={item.path} key={item.text} className={classes.item}>
          <span className={classes['item-body']}>
            <item.icon width={24} height={24} color={themeColors.icon} />
            {item.text}
          </span>
          <span className={classes.icon}>
            <NextIcon color={themeColors.icon} />
          </span>
        </Link>
      ))}
    </div>
  );
};
