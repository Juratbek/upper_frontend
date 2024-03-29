import { useTheme } from 'hooks';
import { FC, useEffect, useState } from 'react';
import { ICONS } from 'variables';

import styles from './article-actions.module.scss';
import { IArticleActionsProps } from './article-actions.types';

let lastScrollTop = Number.MAX_VALUE;

const Like = ICONS.like;
const Dislike = ICONS.dislike;

export const ArticleActions: FC<IArticleActionsProps> = ({ editor }) => {
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(false);
  const { themeColors } = useTheme();

  const detectScrollDirection = (e: Event): void => {
    const target = e.target as HTMLElement;

    const st = target.scrollTop;
    if (st > lastScrollTop) {
      setIsScrollingUp(false);
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
        <Like />
        <span>12</span>
        <Dislike />
      </div>
    </div>
  );
};
