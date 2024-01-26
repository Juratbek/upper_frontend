import { Clickable, TabButton } from 'components/lib';
import { FC, useRef } from 'react';
import { ICONS } from 'variables/icons';

import classes from './Labels.module.scss';
import { ILabelsProps } from './Labels.types';

const NextIcon = ICONS.next;

export const Labels: FC<ILabelsProps> = (props) => {
  const { labels = [], activeLabel } = props;
  const labelsContainerRef = useRef<HTMLDivElement>(null);

  const labelSelectHandler = (id: string) => (): unknown => props.onSelect(id);

  const moveLabelsRight = (): void => {
    const labelsContainer = labelsContainerRef.current;
    if (!labelsContainer) return;
    const leftScroll = labelsContainer.scrollLeft;
    labelsContainer.scrollTo({ left: leftScroll + 300, behavior: 'smooth' });
  };

  const isContentOverflowed = labelsContainerRef.current
    ? labelsContainerRef.current.scrollWidth > labelsContainerRef.current.clientWidth
    : false;

  return (
    <div className={classes.root} style={props.style}>
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
      {isContentOverflowed && (
        <Clickable className={classes['next-btn']} onClick={moveLabelsRight}>
          <NextIcon />
        </Clickable>
      )}
    </div>
  );
};
