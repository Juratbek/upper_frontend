import { FC, useState } from 'react';

import classes from './Tooltip.module.scss';
import { ITooltipProps } from './Tooltip.types';

export const Tooltip: FC<ITooltipProps> = ({ children, tooltip, invisible }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const toggleHover = (): void => {
    if (invisible) return;
    setIsHovered((prev) => !prev);
  };

  return (
    <div className='position-relative' onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      {isHovered && <div className={classes.tooltip}>{tooltip}</div>}
      {children}
    </div>
  );
};
