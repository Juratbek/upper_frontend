import { FC, useState } from 'react';

import classes from './StarMarker.module.scss';
import { IStarMarkerProps } from './StarMarker.types';

export const StarMarker: FC<IStarMarkerProps> = ({ className, onChange }) => {
  const [mark, setMark] = useState(0);

  const starClickHandler = (mark: number): void => {
    setMark(mark);
    onChange?.(mark);
  };

  return (
    <div className={`${classes.container} ${className}`}>
      {Array(mark)
        .fill('')
        .map((_, index) => (
          <span
            className={classes.star}
            key={index}
            onClick={(): void => starClickHandler(index + 1)}
          >
            &#9733;
          </span>
        ))}
      {Array(5 - mark)
        .fill('')
        .map((_, index) => (
          <span
            onClick={(): void => starClickHandler(mark + 1 + index)}
            className={classes.star}
            key={index}
          >
            &#9734;
          </span>
        ))}
    </div>
  );
};
