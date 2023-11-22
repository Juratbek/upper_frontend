import { Input } from 'components/form';
import { useTheme } from 'hooks';
import { ChangeEvent, FC, useCallback } from 'react';
import { TSelectedThemeOption } from 'types';
import { ICONS } from 'variables';

import { ISubmenuProps } from '../ProfilePopover.types';
import { THEME_VARIANTS } from './ThemeMenu.constants';
import classes from './ThemeMenu.module.scss';

const PrevIcon = ICONS.prev;

export const ThemeMenu: FC<ISubmenuProps> = ({ onBack, className }) => {
  const { selectedThemeOption, changeTheme } = useTheme();

  const themeChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value as TSelectedThemeOption;
    changeTheme(value);
  };

  const variantClickHandler = useCallback(
    (variant: TSelectedThemeOption) => () => changeTheme(variant),
    [changeTheme],
  );

  return (
    <div className={`${classes.root} ${className}`}>
      <div className={classes['title-container']}>
        <span className='pointer' onClick={onBack}>
          <PrevIcon />
        </span>
        <p className={classes['title-text']}>Qiyofani tanlash</p>
      </div>
      <ul className={classes.content}>
        {THEME_VARIANTS.map((variant) => (
          <li
            key={variant.name}
            className={classes.variant}
            onClick={variantClickHandler(variant.value)}
          >
            <Input
              value={variant.value}
              onChange={themeChangeHandler}
              checked={selectedThemeOption === variant.value}
              type='radio'
              className={classes['variant-radio']}
            />
            <p className={classes['variant-text']}>{variant.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
