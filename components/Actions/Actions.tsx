import { Divider } from 'components';
import { useClickOutside } from 'hooks';
import { FC, Fragment, useState } from 'react';

import classes from './Actions.module.scss';
import { IActinosProps } from './Actions.types';

export const Actions: FC<IActinosProps> = ({ actions, popupStyle = {}, dotsClassName }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (): void => setIsPopupOpen(true);
  const closePopup = (): void => setIsPopupOpen(false);

  const [ref] = useClickOutside(closePopup);

  return (
    <div ref={ref} className={classes['actions-container']}>
      <div onClick={openPopup} className={`${classes['dots-container']} ${dotsClassName}`}>
        {Array(3)
          .fill(1)
          .map((_, index) => (
            <span key={index} className={classes['dots__item']} />
          ))}
      </div>
      {actions && (
        <div className={`${classes.popup} ${!isPopupOpen && 'd-none'}`} style={popupStyle}>
          {actions.map(({ label, color = 'black', onClick }, index) => (
            <Fragment key={index}>
              <div
                className={`${classes['popup__item']} ${classes[`popup__item--${color}`]}`}
                onClick={onClick}
              >
                {label}
              </div>
              {index + 1 !== actions.length && <Divider />}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
