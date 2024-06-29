import { Input } from 'components/form';
import { SendIcon } from 'components/icons';
import { Button, Clickable, Spinner } from 'components/lib';
import { Comment } from 'components/molecules';
import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { FC, KeyboardEvent, useCallback, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store';
import { useCommentsList, useCreateComment } from 'store/clients/comments';
import { closeCommentsModal, getIsCommentsModalOpen } from 'store/states';

import classes from './CommentsModal.module.scss';
import { NoComments } from './no-comments/NoComments';

export const CommentsModal: FC = () => {
  const { query } = useRouter();
  const articleId = +(query?.id as string);
  const {
    list: comments,
    hasNextPage,
    fetchNextPage,
    isLoading,
    refetch,
  } = useCommentsList(articleId);
  const isOpen = useAppSelector(getIsCommentsModalOpen);
  const dispatch = useDispatch();

  const closeModal = useCallback(() => dispatch(closeCommentsModal()), []);

  return (
    <div className={classes.root} style={{ display: isOpen ? 'block' : 'none' }}>
      <Clickable className={classes.background} onClick={closeModal} />
      <div className={classes.modal}>
        <div className={classes['modal-header']}>
          <p className={classes.headline}>Izohlar</p>
          <Clickable className={classes['close-icon']} onClick={closeModal}>
            &#x2715;
          </Clickable>
        </div>
        <div className={classes['modal-body']} id='comments'>
          {comments.length === 0 && !isLoading ? (
            <NoComments />
          ) : (
            <InfiniteScroll
              hasMore={hasNextPage}
              dataLength={comments.length}
              next={fetchNextPage}
              loader={<Spinner />}
              scrollableTarget='comments'
            >
              {comments.map((comment) => (
                <Comment {...comment} key={comment.id} />
              ))}
            </InfiniteScroll>
          )}
        </div>

        <div className={classes['modal-footer']}>
          <FooterContent articleId={articleId} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

const FooterContent = ({ articleId, refetch }: { articleId: number; refetch: VoidFunction }) => {
  const { mutate: createComment, isPending: isCommentBeingCreated } = useCreateComment(refetch);
  const inputRef = useRef<HTMLInputElement>(null);
  const { status: authStatus, openLoginPage } = useAuth();

  const sendCommentHandler = useCallback(() => {
    const { current } = inputRef;
    if (!current) return;
    const value = current.value;
    if (!value.length) return;
    createComment({ articleId, text: value });
    current.value = '';
  }, [articleId]);

  const heyDownHandler = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;
      if (key === 'Enter') {
        sendCommentHandler();
      }
    },
    [sendCommentHandler],
  );

  if (authStatus === 'authenticated') {
    return (
      <div className={classes['comment-input-container']}>
        <Input
          ref={inputRef}
          rootClassName={classes['comment-input-root']}
          className={classes['comment-input']}
          onKeyDown={heyDownHandler}
          placeholder='Izoh'
        />
        <button
          className={classes['send-btn']}
          onClick={sendCommentHandler}
          disabled={isCommentBeingCreated}
        >
          {isCommentBeingCreated ? <Spinner /> : <SendIcon />}
        </button>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <>
        <p className='m-0'>Izoh qoldirish uchun shaxsiy profilingizga kiring</p>
        <Button className='w-100 mt-2' onClick={() => openLoginPage()}>
          Profilga kirish
        </Button>
      </>
    );
  }

  return null;
};
