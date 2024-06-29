import { CommentIcon, DislikeIcon, LikeIcon, ShareIcon } from 'components/icons';
import { Clickable, Divider } from 'components/lib';
import { SharePopover } from 'components/organisms';
import { useAuth, useClickOutside, useTheme } from 'hooks';
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
import { getClassName } from 'utils';
import { UPPER_BLUE_COLOR } from 'variables/colors';

import classes from './ArticleFooter.module.scss';

export const ArticleFooter: FC<{ sharePopoverId: string }> = ({ sharePopoverId }) => {
  const { query } = useRouter();
  const articleId = Number(query.id);
  const dispatch = useDispatch();
  const { isAuthenticated, openLoginPage } = useAuth();
  const { data: likeCount, refetch: refetchLikeCount } = useLikeCount(articleId);

  const { data: isLikedOrDisliked, refetch: refetchIsLikedOrDisliked } = useIsLikedOrDisliked(
    articleId,
    isAuthenticated,
  );

  const refetchLikeDislikeQueries = () => {
    refetchLikeCount();
    refetchIsLikedOrDisliked();
  };

  const { mutate: like, isPending: isLikePending } = useLike(articleId, refetchLikeDislikeQueries);
  const { mutate: dislike, isPending: isDisLikePending } = useDislike(
    articleId,
    refetchLikeDislikeQueries,
  );

  const { data: commentsCount } = useCommentsCount(articleId);
  const [isOpen, setIsOpen] = useState(false);
  const { themeColors } = useTheme();

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
        <Clickable
          loading={isLikePending}
          disabled={!!isLikedOrDisliked || isLikePending}
          onClick={likeHandler}
        >
          <LikeIcon color={isLikedOrDisliked === true ? UPPER_BLUE_COLOR : themeColors.icon} />
        </Clickable>
        {Boolean(likeCount) && (
          <span className={getClassName(classes['like-count'], classes.count)}>{likeCount}</span>
        )}
        <Divider color='secondary' className={classes.divider} type='vertical' />
        <Clickable
          loading={isDisLikePending}
          disabled={!isLikedOrDisliked || isDisLikePending}
          onClick={dislikeHandler}
        >
          <DislikeIcon color={isLikedOrDisliked === false ? UPPER_BLUE_COLOR : themeColors.icon} />
        </Clickable>
      </div>
      <Clickable onClick={commentClickHandler} className={classes['comment-container']}>
        <CommentIcon color={themeColors.icon} />
        {Boolean(commentsCount) && <span className={classes['count']}>{commentsCount}</span>}
      </Clickable>
      <div className={classes['actions-container']}>
        {/* <Clickable>
          <SaveIcon />
        </Clickable> */}
        <Clickable className={classes.share} onClick={shareClickHandler} id={sharePopoverId}>
          <ShareIcon color={themeColors.icon} />
        </Clickable>
        <SharePopover ref={rootRef} isOpen={isOpen} closeSharePopover={closeSharePopover} />
      </div>
    </div>
  );
};
