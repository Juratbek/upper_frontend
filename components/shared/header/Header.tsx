import { Button, Link } from 'components/lib';
import { SearchInput } from 'components/SearchInput/SearchInput';
import { useTheme } from 'hooks';
import { FC } from 'react';
import { ICONS, WEB_APP_ROOT_DIR } from 'variables';

import { Profile } from '../profile';
import classes from './Header.module.scss';

const Logo = ICONS.logo;

export const Header: FC = () => {
  const { themeColors } = useTheme();

  return (
    <div className={`${classes.header} container`}>
      <Link href={WEB_APP_ROOT_DIR} className={classes.logo}>
        <Logo color={themeColors.icon} />
      </Link>
      <SearchInput />
      <Button className={classes['write-article-btn']}>+ Maqola yozish</Button>
      <Profile />
    </div>
  );
};
