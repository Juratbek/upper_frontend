import EditorJS from '@editorjs/editorjs';
import { FC } from 'react';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { ICON_TYPES, ICONS } from 'variables';

import styles from './article.module.scss';

const CommentIcon = ICONS[ICON_TYPES.comment];
const LikeIcon = ICONS[ICON_TYPES.like];
const DislikeIcon = ICONS[ICON_TYPES.dislike];
const ShareIcon = ICONS[ICON_TYPES.share];

interface IArticleActionsProps {
  containerRef: RefObject<HTMLDivElement>;
  editor: EditorJS | null;
}

let lastScrollTop = 0;

export const ArticleActions: FC<IArticleActionsProps> = ({ containerRef, editor }) => {
  const [actionsBarLeft, setActionsBarLeft] = useState<number>(0);
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(false);

  const actionsContainer = useRef<HTMLDivElement>(null);

  const positionActionsBar = useCallback((): void => {
    if (containerRef.current && actionsContainer.current) {
      const containerCoords = containerRef.current.getBoundingClientRect();
      const actionsWith = actionsContainer.current.offsetWidth;

      const actionsBarLeft = (containerCoords.width - actionsWith) / 2 + containerCoords.left;

      setActionsBarLeft(actionsBarLeft);
    }
  }, []);

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
    positionActionsBar();

    window.addEventListener('resize', positionActionsBar);
    window.addEventListener('scroll', detectScrollDirection);
  }, [containerRef]);

  useEffect(() => {
    editor?.isReady.then(() => setIsScrollingUp(true));
  }, [editor]);

  return (
    <div
      className={`${styles.articleActions}${isScrollingUp ? ' ' + styles.scrollUp : ''}`}
      ref={actionsContainer}
      style={{ left: actionsBarLeft + 'px' }}
    >
      <div className={styles.iconsContainer}>
        <CommentIcon />
        <LikeIcon />
        <span className={styles.reactionsText}>+14k</span>
        <DislikeIcon />
        <ShareIcon />
      </div>
    </div>
  );
};
