import { CommentIcon, DislikeIcon, LikeIcon, ShareIcon } from 'components/icons';
import { Clickable, Divider } from 'components/lib';
import { SharePopover } from 'components/organisms';
import { UPPER_BLUE_COLOR } from 'constants/colors';
import { useAuth, useClickOutside, useTheme } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCommentsCount } from 'store/clients/comments';
import {
  useDislike,
  useIsDisliked,
  useIsLiked,
  useLike,
  useLikeCount,
} from 'store/clients/published-article';
import { toggleCommentsModal } from 'store/states';
import { getClassName } from 'utils';

import classes from './ArticleFooter.module.scss';

export const ArticleFooter: FC<{ sharePopoverId: string }> = ({ sharePopoverId }) => {
  const { query } = useRouter();
  const articleId = Number(query.id);
  const dispatch = useDispatch();
  const { isAuthenticated, openLoginPage } = useAuth();
  const { data: likeCountData, refetch: refetchLikeCount } = useLikeCount(articleId);

  const { data: isLiked, refetch: refetchIsLiked } = useIsLiked(articleId, isAuthenticated);
  const { data: isDisliked, refetch: refetchIsDisliked } = useIsDisliked(
    articleId,
    isAuthenticated,
  );

  const refetchLikeDislikeQueries = () => {
    refetchLikeCount();
    refetchIsLiked();
    refetchIsDisliked();
  };

  const { mutate: like, isPending: isLikePending } = useLike(articleId, refetchLikeDislikeQueries);
  const { mutate: dislike, isPending: isDisLikePending } = useDislike(
    articleId,
    refetchLikeDislikeQueries,
  );

  const { data: commentsCountData } = useCommentsCount(articleId);
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
          disabled={!!isLiked || isLikePending}
          onClick={likeHandler}
          data-testid='like-icon'
        >
          <LikeIcon color={isLiked === true ? UPPER_BLUE_COLOR : themeColors.icon} />
        </Clickable>
        {Boolean(Number(likeCountData?.count)) && (
          <span className={getClassName(classes['like-count'], classes.count)}>
            {likeCountData!.count}
          </span>
        )}
        <Divider color='secondary' className={classes.divider} type='vertical' />
        <Clickable
          loading={isDisLikePending}
          disabled={!isDisliked || isDisLikePending}
          onClick={dislikeHandler}
        >
          <DislikeIcon color={isDisliked === false ? UPPER_BLUE_COLOR : themeColors.icon} />
        </Clickable>
      </div>
      <Clickable
        onClick={commentClickHandler}
        data-testid='comment-icon'
        className={classes['comment-container']}
      >
        <CommentIcon color={themeColors.icon} />
        {Boolean(Number(commentsCountData?.count)) && (
          <span className={classes['count']}>{commentsCountData!.count}</span>
        )}
      </Clickable>
      <div className={classes['actions-container']}>
        {/* <Clickable>
          <SaveIcon />
        </Clickable> */}
        <Clickable
          className={classes.share}
          data-testid='share-icon'
          onClick={shareClickHandler}
          id={sharePopoverId}
        >
          <ShareIcon color={themeColors.icon} />
        </Clickable>
        <SharePopover ref={rootRef} isOpen={isOpen} closeSharePopover={closeSharePopover} />
      </div>
    </div>
  );
};
