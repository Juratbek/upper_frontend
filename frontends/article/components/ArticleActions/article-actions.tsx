import Image from 'next/image';
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

  const likeIcon = useMemo((): JSX.Element => {
    if (isLikedOrDisliked === 0) {
      return (
        <div style={{ transform: 'rotate(180deg) scale(1.2)', display: 'flex' }}>
          <Image width={40} height={40} src='/icons/dislike.webp' />
        </div>
      );
    }
    return <LikeIcon color={isLikedOrDisliked === 1 ? '#54A9EB' : 'black'} />;
  }, [isLikedOrDisliked]);

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
          <div
            className={styles.icon}
            onClick={commentIconClickHandler}
            data-action='open-comments'
          >
            <CommentIcon />
          </div>
          <div className={styles.icon} onClick={(): void => likeDislike(1)}>
            {likeIcon}
          </div>
          {Boolean(likeDislikeCount) && (
            <span className={styles.reactionsText}>{likeDislikeCount}</span>
          )}
          <div className={styles.icon} onClick={(): void => likeDislike(-1)}>
            <DislikeIcon color={isLikedOrDisliked === -1 ? '#54A9EB' : 'black'} />
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
