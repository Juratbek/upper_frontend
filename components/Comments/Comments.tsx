import { CommentSkeleton } from 'components';
import { Button, Divider } from 'components/lib';
import { StorysetImage } from 'components/lib';
import { Comment } from 'components/molecules';
import { useAuth, useClickOutside, useInfiniteScrollV2, useTheme } from 'hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from 'store';
import { useLazyGetCommentsByArticleIdQuery } from 'store/apis';
import { TGetByArticleIdDto } from 'store/apis/comment/comment.types';
import { closeCommentsSidebar, getIsCommentsSidebarOpen, openAuthModal } from 'store/states';
import { IComment } from 'types';
import { getClassName } from 'utils';

import classes from './Comments.module.scss';
import { Form } from './components';

export const Comments = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [selectedComment, setSelectedComment] = useState<IComment>();
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
  const { isAuthenticated, currentBlog } = useAuth();
  const {
    query: { id },
  } = useRouter();
  const { themeColors } = useTheme();
  const isOpen = useAppSelector(getIsCommentsSidebarOpen);
  const rootClassName = getClassName(classes['comments'], isOpen && classes['comments--open']);
  const infiniteScrollApi = useInfiniteScrollV2<IComment>(useLazyGetCommentsByArticleIdQuery);
  const { hasMore, fetchFirstPage, fetchNextPage, list: comments, isLoading } = infiniteScrollApi;

  const closeComments = useCallback(() => {
    dispatch(closeCommentsSidebar());
  }, []);

  const [rootRef] = useClickOutside(closeComments, '[data-action="open-comments"]');

  const fetchFirstPageHandler = (articleId: string | string[] | undefined): void => {
    articleId && fetchFirstPage<TGetByArticleIdDto>({ articleId: +articleId });
  };

  useEffect(() => {
    isOpen && fetchFirstPageHandler(id);
  }, [id, isOpen]);

  const loginClickHandler = (): void => {
    dispatch(openAuthModal());
  };

  const fetchNextPageHandler = (): void => {
    id && fetchNextPage({ articleId: +id });
  };

  const submitHandler = (): void => {
    if (isBeingEdited) {
      clearSelectedComment();
      return;
    }

    const commentsElement = document.getElementById('comments');
    if (commentsElement) {
      commentsElement.scrollTop = 0;
    }
    fetchFirstPageHandler(id);
  };

  const editClickHandler = (comment: IComment): void => {
    setSelectedComment(comment);
    setIsBeingEdited(true);
  };

  const clearSelectedComment = (): void => {
    setSelectedComment(undefined);
    setIsBeingEdited(false);
  };

  const commentsRender = useMemo(() => {
    if (isLoading)
      return Array(3)
        .fill('')
        .map((_, index) => <CommentSkeleton key={index} className='p-1' />);
    if (!comments) return <></>;
    if (comments.length === 0)
      return (
        <div className='text-center mt-3'>
          <StorysetImage
            width={200}
            height={200}
            src='/storyset/comments.svg'
            storysetUri='social-media'
          />
          <p>Maqola haqida o&apos;z fikringizni bildiring</p>
        </div>
      );

    return comments.map((comment) => (
      <Comment
        {...comment}
        key={comment.id}
        onEditClick={editClickHandler}
        currentBlog={currentBlog}
      />
    ));
  }, [comments, isLoading]);

  return (
    <div ref={rootRef} className={rootClassName} style={{ backgroundColor: themeColors.bg }}>
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
          <div className='d-flex align-items-center justify-content-between'>
            <h3 className='m-1'>Izohlar</h3>
            <span className={classes['close-icon']} onClick={closeComments}>
              &#10005;
            </span>
          </div>
          <Divider />
          {commentsRender}
        </InfiniteScroll>
      </div>
      <div
        className={classes['selected-comment']}
        style={{ display: Boolean(selectedComment) ? 'flex' : 'none' }}
      >
        <p className={classes.text}>{selectedComment?.updatedText || selectedComment?.text}</p>
        <span className={classes.icon} onClick={clearSelectedComment}>
          &#10005;
        </span>
      </div>
      <div className={classes.form}>
        {isAuthenticated && isOpen ? (
          <Form
            selectedComment={selectedComment}
            isBeingEdited={isBeingEdited}
            onSubmit={submitHandler}
            api={infiniteScrollApi}
          />
        ) : (
          <div>
            <p className='mt-0'>Izoh qoldirish uchun shaxsiy profilingizga kiring</p>
            <div className='d-flex f-gap-1'>
              <Button className='flex-auto' onClick={loginClickHandler}>
                Profilga kirish
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
