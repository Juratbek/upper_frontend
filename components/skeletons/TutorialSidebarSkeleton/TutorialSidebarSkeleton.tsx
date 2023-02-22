import { FC, Fragment, useMemo } from 'react';

import classes from './TutorialSidebarSkeleton.module.scss';
import { ITutorialSidebarSkeletonProps } from './TutorialSidebarSkeleton.types';

export const TutorialSidebarSkeleton: FC<ITutorialSidebarSkeletonProps> = ({
  withActionIcons = false,
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
        {withActionIcons && <div className={`${classes.icon} skeleton`} />}
      </div>
      {Array(5)
        .fill('')
        .map((_, index) => (
          <Fragment key={index}>{section}</Fragment>
        ))}
    </div>
  );
};
