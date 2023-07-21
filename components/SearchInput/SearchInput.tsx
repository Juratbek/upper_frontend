import { useDebounce, useTheme } from 'hooks';
import { ChangeEvent, FocusEvent, forwardRef, useEffect, useState } from 'react';
import { getClassName } from 'utils';
import { ICONS } from 'variables';

import classes from './SearchInput.module.scss';
import { ISearchInputProps } from './SearchInput.types';

const SearchIcon = ICONS.search;

export const SearchInput = forwardRef<HTMLInputElement, ISearchInputProps>(function Component(
  { className, onChange, onDebounce, ...props },
  ref,
) {
  const [value, setValue] = useState<string>(props.defaultValue as string);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const debauncedValue = useDebounce(value);
  const { themeColors } = useTheme();
  const rootClassName = getClassName(classes.search, className, isFocused && classes.focused);

  useEffect(() => {
    onDebounce?.(debauncedValue);
  }, [debauncedValue]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(event);
    const value = event.target.value;
    setValue(value);
  };

  const focusHandler = (event: FocusEvent<HTMLInputElement>): void => {
    setIsFocused(true);
    props.onFocus?.(event);
  };

  const blueHandler = (event: FocusEvent<HTMLInputElement>): void => {
    setIsFocused(false);
    props.onBlur?.(event);
  };

  return (
    <div className={rootClassName}>
      <span className={classes.icon}>
        <SearchIcon color={themeColors.icon} />
      </span>
      <input
        type='text'
        {...props}
        value={value}
        ref={ref}
        onChange={changeHandler}
        onFocus={focusHandler}
        onBlur={blueHandler}
      />
    </div>
  );
});
