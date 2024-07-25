import { forwardRef, HTMLAttributes } from 'react';

import { IHeaderData } from '../Header.types';

interface IProps extends HTMLAttributes<HTMLHeadingElement>, Pick<IHeaderData, 'level'> {}

export const H = forwardRef<HTMLHeadingElement, IProps>(function Component(
  { level, ...props },
  ref,
) {
  switch (level) {
    case 1:
      return <h1 {...props} ref={ref} />;
    case 2:
      return <h2 {...props} ref={ref} />;
    case 3:
      return <h3 {...props} ref={ref} />;
    case 4:
      return <h4 {...props} ref={ref} />;
    case 5:
      return <h5 {...props} ref={ref} />;
    case 6:
      return <h6 {...props} ref={ref} />;
    default:
      return <h1 {...props} ref={ref} />;
  }
});
