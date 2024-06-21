import { Button } from 'components/lib';
import { useClickOutside, useModal } from 'hooks';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './WithPopover.module.scss';
import { TWithPopoverProps } from './WithPopover.types';

export const WithPopoverButton: FC<TWithPopoverProps> = ({ children, popover, ...props }) => {
  const [isPopoverOpen, togglePopover, { close: closePopover }] = useModal(false);
  const popoverClassName = getClassName(classes.popover, isPopoverOpen && classes['popover--open']);
  const iconClassName = getClassName(classes.icon, isPopoverOpen && classes['icon--open']);

  const [ref] = useClickOutside(closePopover);

  return (
    <div className={classes.container} ref={ref}>
      <Button {...props} onClick={togglePopover}>
        {children}
        &nbsp;
        <div className={iconClassName}>&#x276E;</div>
      </Button>
      <div className={popoverClassName} onClick={closePopover}>
        {popover}
      </div>
    </div>
  );
};
