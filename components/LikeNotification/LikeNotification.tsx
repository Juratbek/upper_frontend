import { FC } from 'react';
import { INotificationComponentProp } from 'types';
import { getClassName } from 'utils';

import classes from './LikeNotification.module.css';

export const LikeNotification: FC<INotificationComponentProp> = (props) => {
  const { className, author, article } = props;
  const rootClassName = getClassName(className, classes['like-notification']);

  return (
    <div className={rootClassName}>
      <div>
        <strong className='pointer'>&quot;{article.title}&quot;</strong> maqolangiz{' '}
        <strong className='pointer'>{author?.name}ga</strong> yoqdi
      </div>
    </div>
  );
};
