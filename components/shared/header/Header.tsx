import { Button, Link } from 'components/lib';
import { SearchInput } from 'components/SearchInput/SearchInput';
import { useTheme } from 'hooks';
import { FC } from 'react';
import { ICONS } from 'variables';

import { Profile } from '../profile';
import classes from './Header.module.scss';

const Logo = ICONS.logo;

export const Header: FC = () => {
  const { themeColors } = useTheme();

  return (
    <div className={`${classes.header} container`}>
      <Link href='/' className={classes.logo}>
        <Logo color={themeColors.icon} />
      </Link>
      <SearchInput />
      <Button className={classes['write-article-btn']}>+ Maqola yozish</Button>
      <Profile />
    </div>
  );
};
