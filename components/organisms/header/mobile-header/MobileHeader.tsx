import { Input } from 'components/form';
import { Link } from 'components/lib';
import { useTheme } from 'hooks';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ICONS } from 'variables';

import classes from './MobileHeader.module.scss';

const Logo = ICONS.logo;
const Search = ICONS.search;
const Prev = ICONS.prev;

export const MobileHeader = (): JSX.Element => {
  const { themeColors } = useTheme();
  const [isSearchUiVisible, setIsSearchUiVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchUiVisibleHandler = useCallback(
    (value: boolean) => () => setIsSearchUiVisible(value),
    [],
  );

  const searchIconClickHandler = useCallback(() => {
    searchUiVisibleHandler(true)();
    searchInputRef.current?.focus();
  }, [searchUiVisibleHandler, searchInputRef.current]);

  const searchUI = useMemo(() => {
    return (
      <div className={`${classes['search-container']} ${isSearchUiVisible ? 'd-flex' : 'd-none'}`}>
        <span onClick={searchUiVisibleHandler(false)}>
          <Prev />
        </span>
        <Input rootClassName={classes['search-input']} ref={searchInputRef} />
      </div>
    );
  }, [searchUiVisibleHandler, searchInputRef, isSearchUiVisible]);

  return (
    <header className={`${classes.header} container`}>
      {searchUI}
      {!isSearchUiVisible && (
        <>
          <Link href='/' className={classes.logo}>
            <Logo color={themeColors.icon} />
          </Link>
          <span onClick={searchIconClickHandler}>
            <Search width={24} height={24} />
          </span>
        </>
      )}
    </header>
  );
};
