import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'store';
import { openCommentsSidebar } from 'store/states';
import { ICON_TYPES, ICONS } from 'variables/icons';

import { IArticleSharePopupProps } from '../ArticleSharePopup';
import styles from './article-actions.module.scss';
import { IArticleActionsProps } from './article-actions.types';

const CommentIcon = ICONS[ICON_TYPES.comment];
const LikeIcon = ICONS[ICON_TYPES.like];
const DislikeIcon = ICONS[ICON_TYPES.dislike];
const ShareIcon = ICONS[ICON_TYPES.share];

const ArticleSharePopup = dynamic<IArticleSharePopupProps>(
  () => import('../ArticleSharePopup').then((mod) => mod.ArticleSharePopup),
  {
    ssr: false,
  },
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

  const detectScrollDirection = (): void => {
    const st = document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      setIsScrollingUp(false);
    } else {
      setIsScrollingUp(true);
    }
    lastScrollTop = st <= 0 ? 0 : st;
  };

  const OpenCommentsSidebar = (): void => {
    dispatch(openCommentsSidebar());
  };

  useEffect(() => {
    window.addEventListener('scroll', detectScrollDirection);
  }, []);

  useEffect(() => {
    editor?.isReady.then(() => setIsScrollingUp(true));
  }, [editor]);

  return (
    <div className={styles.articleActionsContainer}>
      <div className={`${styles.articleActions}${isScrollingUp ? ' ' + styles.scrollUp : ''}`}>
        <ArticleSharePopup visible={isSharePopupOpen} setVisible={setIsSharePopupOpen} />
        <div className={styles.iconsContainer}>
          <div className={styles.icon} onClick={OpenCommentsSidebar} id='comment-icon'>
            <CommentIcon />
          </div>
          <div
            className={`${styles.icon} icon ${isLikedOrDisliked === 1 && 'icon--active'}`}
            onClick={(): void => likeDislike(1)}
          >
            <LikeIcon />
          </div>
          <span className={styles.reactionsText}>{likeDislikeCount}</span>
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
