import { FC, useEffect } from 'react';
import { addKeyboardListener, getClassName } from 'utils';

import classes from './Modal.module.scss';
import { IModalProps } from './Modal.types';

export const Modal: FC<IModalProps> = ({
  isOpen,
  close,
  children,
  size = 'medium',
  bodyClassName,
  color,
}) => {
  const rootClassName = getClassName(classes.modal, isOpen && classes['modal--open']);
  const dialogClassName = getClassName(
    classes['modal-dialog'],
    classes[`modal-dialog--${size}`],
    classes[`modal-dialog--${color}`],
    bodyClassName,
  );

  useEffect(() => {
    const listener = addKeyboardListener({ key: 'Escape' }, close);
    return listener.clear;
  }, []);

  return (
    <div className={rootClassName}>
      <div className={classes['modal-bg']} onClick={close} />
      <div className={dialogClassName}>
        <div className={classes['modal-body']}>{children}</div>
      </div>
    </div>
  );
};
