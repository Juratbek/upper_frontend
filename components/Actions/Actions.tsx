import { Divider, Spinner } from 'components';
import { useClickOutside, useTheme } from 'hooks';
import { FC, Fragment, useMemo, useState } from 'react';

import classes from './Actions.module.scss';
import { IActinosProps } from './Actions.types';

export const Actions: FC<IActinosProps> = ({
  actions = [],
  popupStyle = {},
  dotsClassName,
  loading,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { themeColors } = useTheme();
  const openPopup = (): void => setIsPopupOpen(true);
  const closePopup = (): void => setIsPopupOpen(false);

  const [ref] = useClickOutside(closePopup);

  const actionsContent = useMemo(() => {
    if (loading) return <Spinner color='light' />;
    return actions.map(({ label, color = 'black', onClick }, index) => {
      const labelColorClassName = classes[`popup__item--${color}`];
      return (
        <Fragment key={index}>
          <div
            className={`${classes['popup__item']} ${labelColorClassName}`}
            onClick={(): void => {
              onClick?.();
              closePopup();
            }}
          >
            {label}
          </div>
          {index + 1 !== actions.length && <Divider />}
        </Fragment>
      );
    });
  }, [loading]);

  return (
    <div ref={ref} className={classes['actions-container']}>
      <div onClick={openPopup} className={`${classes['dots-container']} ${dotsClassName}`}>
        {Array(3)
          .fill(1)
          .map((_, index) => (
            <span key={index} className={classes['dots__item']} />
          ))}
      </div>
      <div
        className={`${classes.popup} ${!isPopupOpen && 'd-none'} card`}
        style={{
          backgroundColor: themeColors.popover.bg,
          borderColor: themeColors.popover.border,
          ...popupStyle,
        }}
      >
        {actionsContent}
      </div>
    </div>
  );
};
