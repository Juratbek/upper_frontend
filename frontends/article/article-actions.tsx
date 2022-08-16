import EditorJS from '@editorjs/editorjs';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import { ICON_TYPES, ICONS } from 'variables';

import styles from './article.module.scss';

const CommentIcon = ICONS[ICON_TYPES.comment];
const LikeIcon = ICONS[ICON_TYPES.like];
const DislikeIcon = ICONS[ICON_TYPES.dislike];
const ShareIcon = ICONS[ICON_TYPES.share];

interface IArticleActionsProps {
  editor: EditorJS | null;
}

let lastScrollTop = 0;

export const ArticleActions: FC<IArticleActionsProps> = ({ editor }) => {
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(false);

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
        <div className={styles.iconsContainer}>
          <CommentIcon />
          <LikeIcon />
          <span className={styles.reactionsText}>+14k</span>
          <DislikeIcon />
          <ShareIcon />
        </div>
      </div>
    </div>
  );
};
