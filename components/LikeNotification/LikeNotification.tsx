import { Actions, Label } from 'components';
import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './LikeNotification.module.css';
import { ILikeNotificationProps } from './LikeNotification.types';

export const LikeNotification: FC<ILikeNotificationProps> = (props) => {
  const { className, author, article, actions = [] } = props;
  const rootClassName = getClassName(className, classes['like-notification']);

  return (
    <div className={rootClassName}>
      <div>
        <strong className='pointer'>&quot;{article.title}&quot;</strong> maqolangiz{' '}
        <strong className='pointer'>{author?.name}ga</strong> yoqdi
      </div>
      <div className='d-flex align-items-center'>
        <Label className='me-1'>Yoqdi</Label>
        <Actions actions={actions} />
      </div>
    </div>
  );
};
