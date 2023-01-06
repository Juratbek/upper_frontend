import { Actions, Label } from 'components';
import { FC } from 'react';
import { INotificationComponentProp } from 'types';
import { getClassName } from 'utils';

import classes from './CommentNotification.module.css';

export const CommentNotification: FC<INotificationComponentProp> = (props) => {
  const { className, article, author } = props;
  const rootClassName = getClassName(className, classes['comment-notification']);

  return (
    <div className={rootClassName}>
      <div>
        <strong className='pointer'>&quot;{article.title}&quot;</strong> maqolangizga{' '}
        <strong className='pointer'>{author?.name}</strong> izoh qoldirdi
      </div>
      <div className='d-flex align-items-center'>
        <Label className='me-1'>Izoh</Label>
        <Actions actions={[]} />
      </div>
    </div>
  );
};
