import { useClickOutside } from 'hooks';
import { FC, useMemo, useState } from 'react';

import { ACTIONS } from './Actions.constants';
import classes from './Actions.module.css';
import { IActinosProps } from './Actions.types';

export const Actions: FC<IActinosProps> = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const actions = useMemo(
    () => props.actions?.map((actionType) => ACTIONS[actionType]),
    [props.actions],
  );

  const openPopup = (): void => setIsPopupOpen(true);
  const closePopup = (): void => setIsPopupOpen(false);

  const ref = useClickOutside(closePopup);

  return (
    <div ref={ref} className={classes.actions}>
      <div onClick={openPopup} className={classes.dots}>
        {Array(3)
          .fill(1)
          .map((_, index) => (
            <span key={index} className={classes['dots__item']} />
          ))}
      </div>
      {actions && (
        <div className={`${classes.popup} ${!isPopupOpen && 'd-none'}`}>
          {actions.map(({ Icon, label }, index) => (
            <div className={classes['popup__item']} key={index}>
              {Icon && (
                <>
                  <Icon /> &nbsp;
                </>
              )}
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
