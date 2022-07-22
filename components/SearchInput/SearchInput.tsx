import { FC } from 'react';
import { ICON_TYPES, ICONS } from 'variables';

import classes from './SearchInput.module.scss';
import { ISearchInputProps } from './SearchInput.types';

export const SearchInput: FC<ISearchInputProps> = ({ className, ...props }) => {
  const Icon = ICONS[ICON_TYPES.search];

  return (
    <div className={`${classes.search} ${className}`}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <input type='text' {...props} />
    </div>
  );
};
