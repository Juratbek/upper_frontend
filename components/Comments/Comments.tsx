import { Button, CommentSkeleton, Divider } from 'components';
import { useAuth, useClickOutside } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useLazyGetCommentsByArticleIdQuery } from 'store/apis';
import {
  closeCommentsSidebar,
  getIsCommentsSidebarOpen,
  openLoginModal,
  openRegisterModal,
} from 'store/states';
import { getClassName } from 'utils';

import classes from './Comments.module.scss';
import { Comment, Form } from './components';

export const Comments = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const {
    query: { id },
  } = useRouter();
  const [fetchComments, fetchCommentsRes] = useLazyGetCommentsByArticleIdQuery();
  const isOpen = useAppSelector(getIsCommentsSidebarOpen);
  const rootClassName = getClassName(classes['comments'], isOpen && classes['comments--open']);

  const [rootRef] = useClickOutside(() => {
    dispatch(closeCommentsSidebar());
  }, 'comment-icon');

  useEffect(() => {
    isOpen && id && fetchComments(+id);
  }, [id, isOpen]);

  const loginClickHandler = (): void => {
    dispatch(openLoginModal());
  };

  const registerClickHandler = (): void => {
    dispatch(openRegisterModal());
  };

  const comments = useMemo(() => {
    const { data: comments, isLoading } = fetchCommentsRes;
    if (isLoading)
      return Array(3)
        .fill('')
        .map((_, index) => <CommentSkeleton key={index} className='p-1' />);
    if (!comments) return <></>;
    if (comments.length === 0) return <p className='text-center'>Izohlar mavjud emas</p>;

    const clone = [...comments];
    return clone.reverse().map((comment) => <Comment {...comment} key={comment.id} />);
  }, [fetchCommentsRes]);

  return (
    <div ref={rootRef} className={rootClassName}>
      <div className={classes['comments-list']}>
        <h3 className='m-1'>Izohlar</h3>
        <Divider />
        {comments}
      </div>
      <div className={classes.form}>
        {isAuthenticated ? (
          <Form />
        ) : (
          <div>
            <p className='mt-0'>Izoh qoldirish uchun ro`yxatdan o`ting</p>
            <div className='d-flex f-gap-1'>
              <Button className='flex-auto' color='outline-dark' onClick={loginClickHandler}>
                Profilga kirish
              </Button>
              <Button className='flex-auto' onClick={registerClickHandler}>
                Ro`yxatdan o&apos;tish
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
