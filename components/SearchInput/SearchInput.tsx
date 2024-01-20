import { ApiErrorBoundary } from 'components/ApiErrorBoundary';
import { Clickable, Divider, Link, Spinner } from 'components/lib';
import { useDebounce, useTheme } from 'hooks';
import { ChangeEvent, FocusEvent, forwardRef, useState } from 'react';
import { useSearch } from 'store/clients/published-article';
import { getClassName } from 'utils/common';
import { ICONS } from 'variables/icons';

import classes from './SearchInput.module.scss';
import { ISearchInputProps } from './SearchInput.types';

const SearchIcon = ICONS.search;

export const SearchInput = forwardRef<HTMLInputElement, ISearchInputProps>(function Component(
  { className, onChange, ...props },
  ref,
) {
  const [value, setValue] = useState<string>(props.defaultValue as string);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const debauncedValue = useDebounce(value);
  const { data, ...searchRes } = useSearch(debauncedValue);
  const { themeColors } = useTheme();
  const rootClassName = getClassName(classes.root, className, isFocused && classes.focused);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(event);
    const value = event.target.value;
    setValue(value);
  };

  const focusHandler = (event: FocusEvent<HTMLInputElement>): void => {
    setIsFocused(true);
    props.onFocus?.(event);
    setIsPopoverOpen(true);
  };

  const blueHandler = (event: FocusEvent<HTMLInputElement>): void => {
    setIsFocused(false);
    props.onBlur?.(event);
  };

  const closePopover = (): unknown => setIsPopoverOpen(false);

  return (
    <div>
      <div className={rootClassName}>
        <SearchIcon color={themeColors.icon} width={20} height={20} />
        <Divider type='vertical' className={classes.divider} />
        <input
          type='text'
          className={classes.input}
          placeholder='Qidirish'
          {...props}
          value={value}
          ref={ref}
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blueHandler}
        />
        {isPopoverOpen && (
          <ul className={classes['results-container']}>
            <ApiErrorBoundary
              res={searchRes}
              fallback={<Spinner />}
              defaultComponent={<p className='text-center'>Qidirish uchun yozing</p>}
            >
              {data?.map((article) => (
                <li key={article.id}>
                  <Link className={classes.item} href={`/articles/${article.id}`}>
                    {article.title}
                  </Link>
                </li>
              ))}
              {data?.length === 0 && <p>Ma&apos;lumot topilmadi</p>}
            </ApiErrorBoundary>
          </ul>
        )}
      </div>
      {isPopoverOpen && <Clickable className={classes.bg} onClick={closePopover} />}
    </div>
  );
});
