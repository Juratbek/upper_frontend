import { FC, useMemo } from 'react';

import classes from './TutorialSidebarSkeleton.module.scss';
import { ITutorialSidebarSkeletonProps } from './TutorialSidebarSkeleton.types';

export const TutorialSidebarSkeleton: FC<ITutorialSidebarSkeletonProps> = ({
  isShowAddSectionIcon = false,
  ...props
}) => {
  const section = useMemo(
    () => (
      <div className={classes.body}>
        <div className={`${classes.section} `}>
          <p className={`${classes.text} skeleton`} />
        </div>
        <div className={`${classes.article}`}>
          <div className={`${classes.icon} skeleton`} />
          <p className={`${classes.text} skeleton`} />
        </div>
        <div className={`${classes.article}`}>
          <div className={`${classes.icon} skeleton`} />
          <p className={`${classes.text} skeleton`} />
        </div>
        <div className={`${classes.article}`}>
          <div className={`${classes.icon} skeleton`} />
          <p className={`${classes.text} skeleton`} />
        </div>
      </div>
    ),
    [],
  );
  return (
    <div className={`${props.className}`}>
      <div className={classes.header}>
        <p className={`${classes.text} skeleton`} />
        {isShowAddSectionIcon && <div className={`${classes.icon} skeleton`} />}
      </div>
      {section}
      {section}
      {section}
    </div>
  );
};
