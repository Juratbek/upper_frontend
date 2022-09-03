import EditorJS from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import { ICON_TYPES, ICONS } from 'variables/icons';

import { IArticleSharePopupProps } from '../ArticleSharePopup';
import styles from './article-actions.module.scss';

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

interface IArticleActionsProps {
  editor: EditorJS | null;
}

let lastScrollTop = 0;

export const ArticleActions: FC<IArticleActionsProps> = ({ editor }) => {
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(false);
  const [isSharePopupOpen, setSsSharePopupOpen] = useState(false);

  const detectScrollDirection = (): void => {
    const st = document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      setIsScrollingUp(false);
    } else {
      setIsScrollingUp(true);
    }
    lastScrollTop = st <= 0 ? 0 : st;
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
        <ArticleSharePopup visible={isSharePopupOpen} />
        <div className={styles.iconsContainer}>
          <div className={styles.icon}>
            <CommentIcon />
          </div>
          <div className={styles.icon}>
            <LikeIcon />
          </div>
          <span className={styles.reactionsText}>+14k</span>
          <div className={styles.icon}>
            <DislikeIcon />
          </div>
          <div
            className={styles.icon}
            onClick={(): void => {
              setSsSharePopupOpen((prev) => !prev);
            }}
          >
            <ShareIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
