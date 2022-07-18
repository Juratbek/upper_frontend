import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './Modal.module.scss';
import { IModalProps } from './Modal.types';

export const Modal: FC<IModalProps> = ({ isOpen, close, children }) => {
  const rootClassName = getClassName(classes.modal);
  return (
    <div className={`${rootClassName} ${isOpen && classes['modal--open']}`}>
      <div className={classes['modal-bg']} onClick={close} />
      <div className={classes['modal-dialog']}>
        <div className={classes['modal-body']}>{children}</div>
      </div>
    </div>
  );
};
