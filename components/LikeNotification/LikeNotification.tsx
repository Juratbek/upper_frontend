import { Link } from 'components';
import { FC } from 'react';
import { INotificationComponentProp } from 'types';
import { dateInterval, getClassName } from 'utils';

export const LikeNotification: FC<INotificationComponentProp> = (props) => {
  const { className, author, article, status, createdDate } = props;
  const rootClassName = getClassName(className, status == 'UNREAD' && 'notification--unread');

  const clickHandler = (): void => props.onClick?.(props);

  return (
    <Link href={`/articles/${article.id}`}>
      <div className={rootClassName} onClick={clickHandler}>
        <div>
          <strong
            className='pointer'
            dangerouslySetInnerHTML={{ __html: `&quot;${article.title}&quot;` }}
          />{' '}
          maqolangiz{' '}
          <Link href={`/blogs/${author.id}`} className='link'>
            <strong className='pointer'>{author.name}ga</strong>
          </Link>{' '}
          yoqdi
        </div>
        <time className='date'>{dateInterval(createdDate)}</time>
      </div>
    </Link>
  );
};
