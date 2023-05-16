import { useDebounce, useTheme } from 'hooks';
import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { ICONS } from 'variables';

import classes from './SearchInput.module.scss';
import { ISearchInputProps } from './SearchInput.types';

const SearchIcon = ICONS.search;

export const SearchInput = forwardRef<HTMLInputElement, ISearchInputProps>(function Component(
  { className, onChange, onDebounce, ...props },
  ref,
) {
  const [value, setValue] = useState<string>(props.defaultValue as string);
  const debauncedValue = useDebounce(value);
  const { themeColors } = useTheme();

  useEffect(() => {
    onDebounce?.(debauncedValue);
  }, [debauncedValue]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(event);
    const value = event.target.value;
    setValue(value);
  };

  return (
    <div className={`${classes.search} ${className}`}>
      <span className={classes.icon}>
        <SearchIcon color={themeColors.icon} />
      </span>
      <input type='text' {...props} value={value} ref={ref} onChange={changeHandler} />
    </div>
  );
});
