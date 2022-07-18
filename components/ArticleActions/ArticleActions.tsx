import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ICON_TYPES, ICONS } from 'variables';

import styles from './ArticleActions.module.scss';
const CommentIcon = ICONS[ICON_TYPES.comment];
const LikeIcon = ICONS[ICON_TYPES.like];
const DislikeIcon = ICONS[ICON_TYPES.dislike];
const ShareIcon = ICONS[ICON_TYPES.share];

interface IArticleActions {
  containerRef: RefObject<HTMLDivElement>;
}

export const ArticleActions: React.FC<IArticleActions> = ({ containerRef }: IArticleActions) => {
  const actionsContainer = useRef<HTMLDivElement>(null);
  const [actionsBarLeft, setActionsBarLeft] = useState<number>(0);

  const positionActionsBar = useCallback((): void => {
    if (containerRef.current && actionsContainer.current) {
      const containerWith = containerRef.current.offsetWidth;
      const actionsWith = actionsContainer.current.offsetWidth;

      const actionsBarLeft =
        (containerWith - actionsWith) / 2 + containerRef.current.getBoundingClientRect().left;

      setActionsBarLeft(actionsBarLeft);
    }
  }, []);

  useEffect(() => {
    positionActionsBar();

    window.addEventListener('resize', positionActionsBar);
  }, [containerRef]);

  return (
    <div
      className={styles.articleActions}
      ref={actionsContainer}
      style={{ left: actionsBarLeft + 'px' }}
    >
      <div className={styles.iconsContainer}>
        <CommentIcon />
        <LikeIcon />
        <span>+14k</span>
        <DislikeIcon />
        <ShareIcon />
      </div>
    </div>
  );
};
