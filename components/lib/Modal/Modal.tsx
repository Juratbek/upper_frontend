import { useTheme } from 'hooks';
import { FC, useEffect } from 'react';
import { addKeyboardListener, getClassName } from 'utils';

import { Clickable } from '../Clickable';
import classes from './Modal.module.scss';
import { IModalProps } from './Modal.types';

export const Modal: FC<IModalProps> = ({
  isOpen,
  close,
  children,
  bodyClassName,
  color,
  footer,
}) => {
  const rootClassName = getClassName(classes.modal, isOpen && classes['modal--open']);
  const { themeColors } = useTheme();
  const dialogClassName = getClassName(
    classes['modal-dialog'],
    classes[`modal-dialog--${color}`],
    bodyClassName,
  );

  useEffect(() => {
    const listener = addKeyboardListener({ key: 'Escape' }, close);
    return listener.clear;
  }, []);

  return (
    <div className={rootClassName} data-testid='modal-root'>
      <Clickable
        className={classes['modal-bg']}
        onClick={close}
        style={{ backgroundColor: themeColors.modal.bg }}
      />
      <div
        className={dialogClassName}
        style={{
          backgroundColor: themeColors.modal.dialogBg,
        }}
      >
        <div className={classes['modal-body']}>{children}</div>
        {Boolean(footer) && footer}
      </div>
    </div>
  );
};
