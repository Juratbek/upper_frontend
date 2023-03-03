import { useTheme } from 'hooks';
import { FC, useEffect, useState } from 'react';

import { ArticleActionIcons } from './article-action-icons';
import styles from './article-actions.module.scss';
import { IArticleActionsProps } from './article-actions.types';

let lastScrollTop = Number.MAX_VALUE;

export const ArticleActions: FC<IArticleActionsProps> = ({ editor, article, onLike }) => {
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState<boolean>(false);
  const { themeColors } = useTheme();

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
      <div
        className={`${styles.articleActions}${isScrollingUp ? ' ' + styles.scrollUp : ''}`}
        style={{ backgroundColor: themeColors.bg, border: `1px solid ${themeColors.border}` }}
      >
        <ArticleActionIcons
          popupId='articleActions'
          isSharePopupOpen={isSharePopupOpen}
          setIsSharePopupOpen={setIsSharePopupOpen}
          article={article}
          onLike={onLike}
        />
      </div>
    </div>
  );
};
