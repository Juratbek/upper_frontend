import { FC, useState } from 'react';

import classes from './Tooltip.module.scss';
import { ITooltipProps } from './Tooltip.types';

export const Tooltip: FC<ITooltipProps> = ({
  children,
  tooltip,
  invisible,
  position = 'right',
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const toggleHover = (): void => {
    if (invisible) return;
    setIsHovered((prev) => !prev);
  };

  return (
    <div
      className='position-relative d-flex align-items-center'
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      {isHovered && <div className={`${classes.tooltip} ${classes[position]}`}>{tooltip}</div>}
      {children}
    </div>
  );
};
