import { Link } from 'components/lib';
import { SearchInput } from 'components/SearchInput/SearchInput';
import { useTheme } from 'hooks';
import { FC } from 'react';
import { ICONS } from 'variables';

import classes from './TabletHeader.module.scss';

const Logo = ICONS.logo;

export const TabletHeader: FC = () => {
  const { themeColors } = useTheme();

  return (
    <header className={`${classes.root} container`}>
      <Link href='/' className={classes.logo}>
        <Logo color={themeColors.icon} />
      </Link>
      <SearchInput className={classes['search-input']} />
    </header>
  );
};
