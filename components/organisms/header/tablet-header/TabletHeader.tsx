import { Link } from 'components/lib';
import { SearchInput } from 'components/SearchInput/SearchInput';
import { useTheme } from 'hooks';
import { FC, useRef } from 'react';
import { ICONS } from 'variables/icons';

import classes from './TabletHeader.module.scss';

const Logo = ICONS.logo;

export const TabletHeader: FC = () => {
  const { themeColors } = useTheme();
  const logoRef = useRef<HTMLAnchorElement>(null);

  const searchFocusHandler = (): void => {
    logoRef.current && (logoRef.current.style.display = 'none');
  };

  const closePopoverHandler = (): void => {
    logoRef.current && (logoRef.current.style.display = 'block');
  };

  return (
    <header className={classes.root}>
      <div className={`${classes.container} container`}>
        <Link href='/' className={classes.logo} ref={logoRef}>
          <Logo color={themeColors.icon} />
        </Link>
        <SearchInput
          inputContainerClassName={classes['search-input']}
          onFocus={searchFocusHandler}
          onClosePopover={closePopoverHandler}
        />
      </div>
    </header>
  );
};
