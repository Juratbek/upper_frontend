import { Clickable, Divider } from 'components/lib';
import { SharePopover } from 'components/organisms';
import { useAuth, useClickOutside } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCommentsCount } from 'store/clients/comments';
import {
  useDislike,
  useIsLikedOrDisliked,
  useLike,
  useLikeCount,
} from 'store/clients/published-article';
import { toggleCommentsModal } from 'store/states';
import { ICONS } from 'variables';
import { UPPER_BLUE_COLOR } from 'variables/colors';

import classes from './ArticleFooter.module.scss';

const Like = ICONS.like;
const Dislike = ICONS.dislike;
const CommentIcon = ICONS.comment;
// const SaveIcon = ICONS.save;
const ShareIcon = ICONS.share;

export const ArticleFooter: FC<{ sharePopoverId: string }> = ({ sharePopoverId }) => {
  const { query } = useRouter();
  const articleId = Number(query.id);
  const dispatch = useDispatch();
  const { isAuthenticated, openLoginPage } = useAuth();
  const { mutate: like } = useLike(articleId);
  const { mutate: dislike } = useDislike(articleId);
  const { data: commentsCount } = useCommentsCount(articleId);
  const { data: likeCount } = useLikeCount(articleId);
  const [isOpen, setIsOpen] = useState(false);
  const { data: isLikedOrDisliked } = useIsLikedOrDisliked(articleId);

  const commentClickHandler = (): unknown => dispatch(toggleCommentsModal());
  const shareClickHandler = (): unknown => setIsOpen((prev) => !prev);
  const closeSharePopover = (): unknown => setIsOpen(false);

  const [rootRef] = useClickOutside(closeSharePopover, `#${sharePopoverId}`);

  const likeHandler = (): void => {
    if (isAuthenticated) {
      like();
    } else {
      openLoginPage("Iltimos maqolaga layk bosish uchun ro'yxatdan o'ting");
    }
  };

  const dislikeHandler = (): void => {
    if (isAuthenticated) {
      dislike();
    } else {
      openLoginPage("Iltimos maqolaga dislayk bosish uchun ro'yxatdan o'ting");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes['reactions-container']}>
        <Clickable onClick={likeHandler}>
          <Like color={isLikedOrDisliked === true ? UPPER_BLUE_COLOR : undefined} />
        </Clickable>
        {Boolean(likeCount) && <span className={classes['like-count']}>{likeCount}</span>}
        <Divider color='secondary' className={classes.divider} type='vertical' />
        <Clickable onClick={dislikeHandler}>
          <Dislike color={isLikedOrDisliked === false ? UPPER_BLUE_COLOR : undefined} />
        </Clickable>
      </div>
      <Clickable onClick={commentClickHandler} className={classes['comment-container']}>
        <CommentIcon />
        {Boolean(commentsCount) && <span className={classes['count']}>{commentsCount}</span>}
      </Clickable>
      <div className={classes['actions-container']}>
        {/* <Clickable>
          <SaveIcon />
        </Clickable> */}
        <Clickable className={classes.share} onClick={shareClickHandler} id={sharePopoverId}>
          <ShareIcon />
        </Clickable>
        <SharePopover ref={rootRef} isOpen={isOpen} closeSharePopover={closeSharePopover} />
      </div>
    </div>
  );
};
