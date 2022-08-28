import { FC, useMemo, useState } from 'react';
import { getClassName } from 'utils';
import { ICON_TYPES, ICONS } from 'variables/icons';

import classes from './Dropdown.module.scss';
import { IDropdownProps } from './Dropdown.types';

const Triangle = ICONS[ICON_TYPES.triangle];

export const Dropdown: FC<IDropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen || false);
  const { title, children, className, titleClassName } = props;

  const rootClassName = useMemo(() => getClassName(classes.container, className), [className]);
  const dropdownClassName = useMemo(
    () => getClassName(props.dropdownClassName, isOpen ? classes.open : classes.closed),
    [props.dropdownClassName, isOpen],
  );

  const dropdownHandler = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={rootClassName}>
      <div onClick={dropdownHandler} className={`${classes.title} ${titleClassName}`}>
        {title}
        <span className={`${classes.icon} ${isOpen && classes['icon-open']}`}>
          <Triangle />
        </span>
      </div>
      <div className={dropdownClassName}>{children}</div>
    </div>
  );
};
