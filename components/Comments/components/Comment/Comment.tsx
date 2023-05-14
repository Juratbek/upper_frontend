import { Avatar, Button, Divider } from 'components';
import { useAuth } from 'hooks';
import Link from 'next/link';
import { FC } from 'react';
import { useAppDispatch } from 'store';
import { closeCommentsSidebar } from 'store/states';
import { addAmazonUri, dateInterval } from 'utils';
import { WEB_APP_ROOT_DIR } from 'variables';

import classes from './Comment.module.scss';
import { ICommentProps } from './Comment.types';

export const Comment: FC<ICommentProps> = (props) => {
  const { author, text, date, updatedText } = props;
  const dispatch = useAppDispatch();
  const { currentBlog } = useAuth();

  const closeComments = (): unknown => dispatch(closeCommentsSidebar());

  const onEditClick = (): void => props.onEditClick(props);

  return (
    <>
      <div className={classes.comment}>
        <div className={classes.author}>
          <Avatar imgUrl={addAmazonUri(author).imgUrl} size='small' />
          <div className='ms-1'>
            <Link href={`${WEB_APP_ROOT_DIR}/blogs/${author.id}`}>
              <a onClick={closeComments}>
                <h5 className='m-0 link pointer'>{author.name}</h5>
              </a>
            </Link>
            <p className={`m-0 ${classes.date}`}>
              {dateInterval(date)} {Boolean(updatedText) && "(o'zgartirilgan)"}{' '}
            </p>
          </div>
        </div>
        {currentBlog?.id === author.id && (
          <Button
            className={classes['edit-button']}
            size='small'
            color='light'
            onClick={onEditClick}
          >
            O&apos;zgartirish
          </Button>
        )}
        <div className={classes.message}>{updatedText || text}</div>
      </div>
      <Divider className='w-90 mx-auto' />
    </>
  );
};
