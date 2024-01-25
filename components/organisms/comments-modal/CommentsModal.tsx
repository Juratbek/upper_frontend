import { Input } from 'components/form';
import { Clickable, Spinner } from 'components/lib';
import { Comment } from 'components/molecules';
import { useRouter } from 'next/router';
import { FC, KeyboardEvent, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store';
import { useCommentsList, useCreateComment } from 'store/clients/comments';
import { closeCommentsModal, getIsCommentsModalOpen } from 'store/states';
import { ICONS } from 'variables';

import classes from './CommentsModal.module.scss';
import { NoComments } from './no-comments/NoComments';

const SendIcon = ICONS.send;

export const CommentsModal: FC = () => {
  const { query } = useRouter();
  const articleId = +(query?.id as string);
  const { list: comments } = useCommentsList(articleId);
  const { mutate: createComment, isPending: isCommentBeingCreated } = useCreateComment();
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpen = useAppSelector(getIsCommentsModalOpen);
  const dispatch = useDispatch();

  const closeModal = useCallback(() => dispatch(closeCommentsModal()), []);

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
        <div className={classes['modal-body']}>
          {comments.length === 0 ? (
            <NoComments />
          ) : (
            comments.map((comment) => <Comment {...comment} key={comment.id} />)
          )}
        </div>
        <div className={classes['modal-footer']}>
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
        </div>
      </div>
    </div>
  );
};
