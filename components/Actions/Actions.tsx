import { useClickOutside } from 'hooks';
import { FC, useState } from 'react';

import classes from './Actions.module.scss';
import { IActinosProps } from './Actions.types';

export const Actions: FC<IActinosProps> = ({ actions }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (): void => setIsPopupOpen(true);
  const closePopup = (): void => setIsPopupOpen(false);

  const [ref] = useClickOutside(closePopup);

  return (
    <div ref={ref} className={classes['actions-container']}>
      <div onClick={openPopup} className={classes['dots-container']}>
        {Array(3)
          .fill(1)
          .map((_, index) => (
            <span key={index} className={classes['dots__item']} />
          ))}
      </div>
      {actions && (
        <div className={`${classes.popup} ${!isPopupOpen && 'd-none'}`}>
          {actions.map(({ label }, index) => (
            <div className={classes['popup__item']} key={index}>
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
