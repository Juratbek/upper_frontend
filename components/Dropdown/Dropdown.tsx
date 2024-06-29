import { TriangleIcon } from 'components/icons';
import { FC, useState } from 'react';
import { getClassName } from 'utils';

import classes from './Dropdown.module.scss';
import { IDropdownProps } from './Dropdown.types';

export const Dropdown: FC<IDropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen || false);
  const { title, children, titleClassName, paddingLeft } = props;

  const dropdownHandler = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={dropdownHandler}
        className={`${classes.title} ${titleClassName}`}
        style={{
          paddingLeft,
        }}
      >
        {title}
        <span
          className={`${classes.icon} ${isOpen && classes['icon-open']} ${
            props.iconSize ? classes[`icon-${props.iconSize}`] : 'icon-large'
          }`}
        >
          <TriangleIcon />
        </span>
      </div>
      <div className={getClassName(isOpen ? classes.open : classes.closed)}>{children}</div>
    </>
  );
};
