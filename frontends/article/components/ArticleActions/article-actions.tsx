import { FC, useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'store';
import { toggleCommentsSidebar } from 'store/states';
import { appDynamic } from 'utils';
import { ICONS } from 'variables/icons';

import { IArticleSharePopupProps } from '../ArticleSharePopup';
import styles from './article-actions.module.scss';
import { IArticleActionsProps } from './article-actions.types';

const CommentIcon = ICONS.comment;
const LikeIcon = ICONS.like;
const DislikeIcon = ICONS.dislike;
const ShareIcon = ICONS.share;

const ArticleSharePopup = appDynamic<IArticleSharePopupProps>(() =>
  import('../ArticleSharePopup').then((mod) => mod.ArticleSharePopup),
);

let lastScrollTop = Number.MAX_VALUE;

export const ArticleActions: FC<IArticleActionsProps> = ({
  editor,
  isLikedOrDisliked,
  likeDislikeCount,
  likeDislike,
}) => {
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const dispatch = useAppDispatch();

  const detectScrollDirection = (e: Event): void => {
    const target = e.target as HTMLElement;

    const st = target.scrollTop;
    if (st > lastScrollTop) {
      setIsScrollingUp(false);
      setIsSharePopupOpen(false);
    } else {
      setIsScrollingUp(true);
    }
    lastScrollTop = st <= 0 ? 0 : st;
  };

  const commentIconClickHandler = (): void => {
    dispatch(toggleCommentsSidebar());
  };

  const reactionsCount = useMemo(() => {
    return likeDislikeCount || '';
  }, [likeDislikeCount]);

  useEffect(() => {
    document.querySelector('.main')?.addEventListener('scroll', detectScrollDirection);

    return () => {
      document.querySelector('.main')?.removeEventListener('scroll', detectScrollDirection);
    };
  }, []);

  useEffect(() => {
    editor?.isReady.then(() => setIsScrollingUp(true));
  }, [editor]);

  return (
    <div className={styles.articleActionsContainer}>
      <ArticleSharePopup visible={isSharePopupOpen} setVisible={setIsSharePopupOpen} />
      <div
        className={`${styles.articleActions}${isScrollingUp ? ' ' + styles.scrollUp : ''}`}
        id={'articleActions'}
      >
        <div className={styles.iconsContainer}>
          <div className={styles.icon} onClick={commentIconClickHandler} id='comment-icon'>
            <CommentIcon />
          </div>
          <div
            className={`${styles.icon} icon ${isLikedOrDisliked === 1 && 'icon--active'}`}
            onClick={(): void => likeDislike(1)}
          >
            <LikeIcon />
          </div>
          <span
            className={[
              styles.reactionsText,
              !reactionsCount && styles.reactionsTextZeroCount,
            ].join(' ')}
          >
            {reactionsCount}
          </span>
          <div
            className={`${styles.icon} icon ${isLikedOrDisliked === -1 && 'icon--active'}`}
            onClick={(): void => likeDislike(-1)}
          >
            <DislikeIcon />
          </div>
          <div
            className={styles.icon}
            onClick={(e): void => {
              e.stopPropagation();
              setIsSharePopupOpen((prev) => !prev);
            }}
          >
            <ShareIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
