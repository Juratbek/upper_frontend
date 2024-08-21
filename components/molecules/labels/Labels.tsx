import { NextIcon, PrevIcon } from 'components/icons';
import { Clickable, TabButton } from 'components/lib';
import { COMMON_SPACE_FROM_TOP } from 'components/wrappers';
import { useDragScroll, useTheme } from 'hooks';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { getClassName } from 'utils';

import classes from './Labels.module.scss';
import { ILabelsProps } from './Labels.types';

export const Labels: FC<ILabelsProps> = (props) => {
  const { labels = [], activeLabel } = props;
  const labelsContainerRef = useRef<HTMLDivElement>(null);
  const { themeColors } = useTheme();
  const [isNextVisible, setIsNextVisible] = useState(true);
  const [isPrevVisible, setIsPrevVisible] = useState(false);

  useDragScroll(labelsContainerRef);

  const labelSelectHandler = (id: string) => (): unknown => props.onSelect(id);

  const moveLabels = (space: number = 300) => {
    return () => {
      const labelsContainer = labelsContainerRef.current;
      if (!labelsContainer) return;
      const leftScroll = labelsContainer.scrollLeft;
      labelsContainer.scrollTo({ left: leftScroll + space, behavior: 'smooth' });
    };
  };

  const checkScrollPosition = useCallback(() => {
    const labelsContainer = labelsContainerRef.current;
    if (!labelsContainer) return;

    const { scrollLeft, scrollWidth, clientWidth } = labelsContainer;

    setIsPrevVisible(scrollLeft > 0);
    setIsNextVisible(scrollLeft + clientWidth < scrollWidth);
  }, [labels]);

  useEffect(() => {
    const labelsContainer = labelsContainerRef.current;
    if (!labelsContainer) return;

    checkScrollPosition();

    labelsContainer.addEventListener('scroll', checkScrollPosition);

    return () => {
      labelsContainer.removeEventListener('scroll', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const isContentOverflowed = labelsContainerRef.current
    ? labelsContainerRef.current.scrollWidth > labelsContainerRef.current.clientWidth
    : false;

  return (
    <div
      className={getClassName(classes.root, props.className)}
      style={{
        paddingTop: COMMON_SPACE_FROM_TOP,
        marginTop: '-' + COMMON_SPACE_FROM_TOP,
        ...(props.style ?? {}),
      }}
    >
      <div className={classes.container}>
        {isPrevVisible && isContentOverflowed && (
          <Clickable
            data-testid='prev-btn'
            className={getClassName(classes['prev-btn'], classes['navigation-btn'])}
            onClick={moveLabels(-300)}
          >
            <PrevIcon color={themeColors.icon} />
          </Clickable>
        )}
        <div className={classes['labels-container']} id='labels' ref={labelsContainerRef}>
          <div className={classes['lebels-list']}>
            {labels.map((label) => (
              <TabButton
                onClick={labelSelectHandler(label)}
                color={label == activeLabel ? 'primary' : 'outlined'}
                key={label}
              >
                {label}
              </TabButton>
            ))}
          </div>
        </div>
        {isNextVisible && isContentOverflowed && (
          <Clickable
            data-testid='next-btn'
            className={getClassName(classes['next-btn'], classes['navigation-btn'])}
            onClick={moveLabels(300)}
          >
            <NextIcon color={themeColors.icon} />
          </Clickable>
        )}
      </div>
    </div>
  );
};
