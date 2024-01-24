import { Clickable, Divider } from 'components/lib';
import { SharePopover } from 'components/organisms';
import { useAuth, useClickOutside } from 'hooks';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store';
import { useCommentsCount } from 'store/clients/comments';
import { useDislike, useLike, useLikeCount } from 'store/clients/published-article';
import { toggleCommentsModal } from 'store/states';
import {
  closeSharePopover,
  getIsSharePopoverOpen,
  toggleSharePopover,
} from 'store/states/sharePopover';
import { ICONS } from 'variables';

import classes from './ArticleFooter.module.scss';

const Like = ICONS.like;
const Dislike = ICONS.dislike;
const CommentIcon = ICONS.comment;
const SaveIcon = ICONS.save;
const ShareIcon = ICONS.share;

export const ArticleFooter: FC = () => {
  const { query } = useRouter();
  const articleId = Number(query.id);
  const dispatch = useDispatch();
  const { isAuthenticated, openLoginPage } = useAuth();
  const { mutate: like } = useLike(articleId);
  const { mutate: dislike } = useDislike(articleId);
  const { data: commentsCount } = useCommentsCount(articleId);
  const { data: likeCount } = useLikeCount(articleId);
  const isOpen = useAppSelector(getIsSharePopoverOpen);

  const commentClickHandler = (): unknown => dispatch(toggleCommentsModal());
  const shareClickHandler = (): unknown => dispatch(toggleSharePopover());

  const [rootRef] = useClickOutside((): unknown => dispatch(closeSharePopover()), '#share-btn');

  const likeHandler = (): void => {
    if (isAuthenticated) {
      like(articleId);
    } else {
      openLoginPage("Iltimos maqolaga layk bosish uchun ro'yxatdan o'ting");
    }
  };

  const dislikeHandler = (): void => {
    if (isAuthenticated) {
      dislike(articleId);
    } else {
      openLoginPage("Iltimos maqolaga dislayk bosish uchun ro'yxatdan o'ting");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes['reactions-container']}>
        <Clickable onClick={likeHandler}>
          <Like />
        </Clickable>
        {Boolean(likeCount) && <span className={classes['like-count']}>{likeCount}</span>}
        <Divider color='secondary' className={classes.divider} type='vertical' />
        <Clickable onClick={dislikeHandler}>
          <Dislike />
        </Clickable>
      </div>
      <Clickable onClick={commentClickHandler} className={classes['comment-container']}>
        <CommentIcon />
        {Boolean(commentsCount) && <span className={classes['count']}>{commentsCount}</span>}
      </Clickable>
      <div className={classes['actions-container']}>
        <Clickable>
          <SaveIcon />
        </Clickable>
        <Clickable className={classes.share} onClick={shareClickHandler} id='share-btn'>
          <ShareIcon />
        </Clickable>
        <SharePopover ref={rootRef} isOpen={isOpen} />
      </div>
    </div>
  );
};
