import { Actions, Label } from 'components';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './CommentNotification.module.css';
import { ICommentNotificationProps } from './CommentNotification.types';

export const CommentNotification: FC<ICommentNotificationProps> = (props) => {
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
