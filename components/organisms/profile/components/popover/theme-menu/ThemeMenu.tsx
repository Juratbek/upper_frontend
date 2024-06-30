import { Input } from 'components/form';
import { PrevIcon } from 'components/icons';
import { Clickable } from 'components/lib';
import { THEME_VARIANTS } from 'context';
import { useTheme } from 'hooks';
import { ChangeEvent, FC, useCallback } from 'react';
import { TSelectedThemeOption } from 'types';

import { ISubmenuProps } from '../ProfilePopover.types';
import classes from './ThemeMenu.module.scss';

export const ThemeMenu: FC<ISubmenuProps> = ({ onBack, className }) => {
  const { selectedThemeOption, changeTheme, themeColors } = useTheme();

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
        <Clickable className='pointer' onClick={onBack}>
          <PrevIcon color={themeColors.icon} />
        </Clickable>
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
