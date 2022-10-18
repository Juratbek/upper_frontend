import { FC, HTMLAttributes } from 'react';

import classes from './SidebarSearchArticleSkeleton.module.scss';

export const SidebarSearchArticleSkeleton: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div className={`d-flex align-items-center ${props.className}`}>
      <div className='me-1 flex-1'>
        {Array(2)
          .fill('')
          .map((_, index) => (
            <div key={index} className={`${classes.text} w-100 skeleton`} />
          ))}
      </div>
      <div className={`${classes.img} skeleton`} />
    </div>
  );
};
