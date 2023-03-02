import { useAuth, useTheme } from 'hooks';
import Image from 'next/image';
import { FC, FormEvent, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from 'store';
import { useLazyCheckIfLikedDislikedQuery, useLikeDislikeMutation } from 'store/apis';
import { openLoginModal, toggleCommentsSidebar } from 'store/states';
import { appDynamic } from 'utils';
import { ICONS, UPPER_BLUE_COLOR } from 'variables';

import { IArticleSharePopupProps } from '../ArticleSharePopup';
import styles from './article-actions.module.scss';
import { IArticleActionsIconsProps } from './article-actions.types';
const CommentIcon = ICONS.comment;
const LikeIcon = ICONS.like;
const DislikeIcon = ICONS.dislike;
const ShareIcon = ICONS.share;

const ArticleSharePopup = appDynamic<IArticleSharePopupProps>(() =>
  import('../ArticleSharePopup').then((mod) => mod.ArticleSharePopup),
);

export const ArticleActionIcons: FC<IArticleActionsIconsProps> = ({
  right,
  popupId,
  article,
  isSharePopupOpen,
  setIsSharePopupOpen,
  likeDislikeCount,
  setLikeDislikeCount,
}) => {
  const { id, likeCount = 0, dislikeCount = 0 } = article || {};
  const { isAuthenticated } = useAuth();
  const { themeColors } = useTheme();
  const dispatch = useAppDispatch();
  const [likeDislikeArticle, likeDislikeRes] = useLikeDislikeMutation();
  const [checkIfLikedDislikedQuery, { data: isLikedOrDisliked }] =
    useLazyCheckIfLikedDislikedQuery();

  const likeDislike = (value: -1 | 1): void => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }
    if (likeDislikeRes.isLoading || value === isLikedOrDisliked || !id) return;
    likeDislikeArticle({ id, value }).then(() => {
      setLikeDislikeCount((prev) => prev + value - (isLikedOrDisliked || 0));
    });
  };

  const shareIconClickHandler = (event: FormEvent<Element>): void => {
    event?.stopPropagation();
    setIsSharePopupOpen((prev) => !prev);
  };

  const commentIconClickHandler = (): void => {
    dispatch(toggleCommentsSidebar());
  };
  const likeIcon = useMemo((): JSX.Element => {
    if (isLikedOrDisliked === 0) {
      return (
        <div style={{ transform: 'rotate(180deg) scale(1.2)', display: 'flex' }}>
          <Image width={40} height={40} src='/icons/dislike.webp' />
        </div>
      );
    }
    return <LikeIcon color={isLikedOrDisliked === 1 ? UPPER_BLUE_COLOR : themeColors.icon} />;
  }, [isLikedOrDisliked, themeColors]);

  useEffect(() => {
    if (isAuthenticated && id) {
      checkIfLikedDislikedQuery(id);
      setLikeDislikeCount(likeCount - dislikeCount);
    }
  }, [isAuthenticated, id]);

  return (
    <div id={popupId} className={styles.iconsContainer}>
      <ArticleSharePopup
        right={right}
        id={popupId}
        visible={isSharePopupOpen}
        setVisible={setIsSharePopupOpen}
      />
      <div className={styles.icon} onClick={commentIconClickHandler} data-action='open-comments'>
        <CommentIcon color={themeColors.icon} />
      </div>
      <div className={styles.icon} onClick={(): void => likeDislike(1)}>
        {likeIcon}
      </div>
      {likeDislikeCount > 0 ? <span className={styles.reactionsText}>{likeDislikeCount}</span> : ''}
      <div className={styles.icon} onClick={(): void => likeDislike(-1)}>
        <DislikeIcon color={isLikedOrDisliked === -1 ? UPPER_BLUE_COLOR : themeColors.icon} />
      </div>
      <div className={styles.icon} onClick={shareIconClickHandler}>
        <ShareIcon color={themeColors.icon} />
      </div>
    </div>
  );
};
