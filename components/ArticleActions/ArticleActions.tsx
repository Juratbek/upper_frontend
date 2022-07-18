import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { ICON_TYPES, ICONS } from 'variables';

import styles from './ArticleActions.module.scss';
const CommentIcon = ICONS[ICON_TYPES.comment];
const LikeIcon = ICONS[ICON_TYPES.like];
const DislikeIcon = ICONS[ICON_TYPES.dislike];
const ShareIcon = ICONS[ICON_TYPES.share];

interface IArticleActions {
  containerRef: RefObject<HTMLDivElement>;
}

let lastScrollTop = 0;

export const ArticleActions: React.FC<IArticleActions> = ({ containerRef }: IArticleActions) => {
  const [actionsBarLeft, setActionsBarLeft] = useState<number>(0);
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(false);

  const actionsContainer = useRef<HTMLDivElement>(null);

  const positionActionsBar = useCallback((): void => {
    if (containerRef.current && actionsContainer.current) {
      const containerWith = containerRef.current.offsetWidth;
      const actionsWith = actionsContainer.current.offsetWidth;

      const actionsBarLeft =
        (containerWith - actionsWith) / 2 + containerRef.current.getBoundingClientRect().left;

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
