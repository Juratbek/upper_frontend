import { Button, CommentSkeleton, Divider } from 'components';
import { useAuth, useClickOutside, useInfiniteScrollV2 } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from 'store';
import { useLazyGetCommentsByArticleIdQuery } from 'store/apis';
import { TGetByArticleIdDto } from 'store/apis/comment/comment.types';
import {
  closeCommentsSidebar,
  getIsCommentsSidebarOpen,
  openLoginModal,
  openRegisterModal,
} from 'store/states';
import { IComment } from 'types';
import { getClassName } from 'utils';

import classes from './Comments.module.scss';
import { Comment, Form } from './components';

export const Comments = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const {
    query: { id },
  } = useRouter();
  // const [fetchComments, fetchCommentsRes] = useLazyGetCommentsByArticleIdQuery();
  const isOpen = useAppSelector(getIsCommentsSidebarOpen);
  const rootClassName = getClassName(classes['comments'], isOpen && classes['comments--open']);
  const {
    hasMore,
    fetchFirstPage,
    fetchNextPage,
    list: comments,
    isLoading,
  } = useInfiniteScrollV2<IComment>(useLazyGetCommentsByArticleIdQuery);

  const [rootRef] = useClickOutside(() => {
    dispatch(closeCommentsSidebar());
  }, '[data-action="open-comments"]');

  const fetchFirstPageHandler = (articleId: string | string[] | undefined): void => {
    articleId && fetchFirstPage<TGetByArticleIdDto>({ articleId: +articleId });
  };

  useEffect(() => {
    isOpen && fetchFirstPageHandler(id);
  }, [id, isOpen]);

  const loginClickHandler = (): void => {
    dispatch(openLoginModal());
  };

  const registerClickHandler = (): void => {
    dispatch(openRegisterModal());
  };

  const fetchNextPageHandler = (): void => {
    id && fetchNextPage({ articleId: +id });
  };

  const submitHandler = (): void => {
    const commentsElement = document.getElementById('comments');
    if (commentsElement) {
      commentsElement.scrollTop = 0;
    }
    fetchFirstPageHandler(id);
  };

  const commentsRender = useMemo(() => {
    if (isLoading)
      return Array(3)
        .fill('')
        .map((_, index) => <CommentSkeleton key={index} className='p-1' />);
    if (!comments) return <></>;
    if (comments.length === 0) return <p className='text-center'>Izohlar mavjud emas</p>;

    return comments.map((comment) => <Comment {...comment} key={comment.id} />);
  }, [comments, isLoading]);

  return (
    <div ref={rootRef} className={rootClassName}>
      <div className={classes['comments-list']} id='comments'>
        <InfiniteScroll
          hasMore={hasMore}
          loader={Array(3)
            .fill('')
            .map((_, index) => (
              <CommentSkeleton key={index} className='p-1' />
            ))}
          dataLength={comments.length}
          next={fetchNextPageHandler}
          scrollableTarget='comments'
        >
          <h3 className='m-1'>Izohlar</h3>
          <Divider />
          {commentsRender}
        </InfiniteScroll>
      </div>
      <div className={classes.form}>
        {isAuthenticated ? (
          <Form onSubmit={submitHandler} />
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
