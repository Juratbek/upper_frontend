import { ArticleImg } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './SidebarTutorial.module.scss';
import { ISidebarTutorialProps } from './SidebarTutorial.types';

export const SidebarTutorial: FC<ISidebarTutorialProps> = ({
  id,
  name,
  imgUrl,
  className,
  labels = [],
}) => {
  const rootClassName = getClassName(classes.root, className);

  return (
    <Link href={`/tutorials/${id}`}>
      <div className={rootClassName}>
        <div className='d-flex justify-content-between'>
          <div>
            <h4 className='my-1' style={{ marginBottom: '0.3rem' }}>
              {name}
            </h4>
            {labels.map((label) => (
              <span key={label} className={classes.label}>
                {label}
              </span>
            ))}
          </div>
          <ArticleImg imgUrl={imgUrl} size='small' className='pointer' />
        </div>
      </div>
    </Link>
  );
};