import { TabButton } from 'components/lib';
import { useAuth, useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';
import { useGetCurrentBlogTags } from 'store/clients/blog';
import { ICONS } from 'variables/icons';

import { ForYouLabel, LABEL_ID_PARAM, TopLabel } from './Labels.constants';
import classes from './Labels.module.scss';

const NextIcon = ICONS.next;

export const Labels = (): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const { setParam } = useUrlParams();
  const { query } = useRouter();
  const labelsContainerRef = useRef<HTMLDivElement>(null);
  const fetchCurrentBlogTagsRes = useGetCurrentBlogTags();

  const labelSelectHandler = (id: number | string) => (): void => {
    setParam(LABEL_ID_PARAM, id);
  };

  const labels = useMemo(() => {
    const labels: string[] = [TopLabel];

    if (isAuthenticated) labels.unshift(ForYouLabel);

    const { data } = fetchCurrentBlogTagsRes;
    if (data?.length) labels.push(...data);

    return labels;
  }, [isAuthenticated, fetchCurrentBlogTagsRes]);

  const moveLabelsRight = (): void => {
    const labelsContainer = labelsContainerRef.current;
    if (!labelsContainer) return;
    const leftScroll = labelsContainer.scrollLeft;
    labelsContainer.scrollTo({ left: leftScroll + 600, behavior: 'smooth' });
  };

  const isContentOverflowed = labelsContainerRef.current
    ? labelsContainerRef.current.scrollWidth > labelsContainerRef.current.clientWidth
    : false;

  return (
    <div className={classes.root}>
      <div className={classes['labels-container']} id='labels' ref={labelsContainerRef}>
        {labels.map((label) => (
          <TabButton
            onClick={labelSelectHandler(label)}
            color={label == query[LABEL_ID_PARAM] ? 'primary' : 'outlined'}
            key={label}
          >
            {label}
          </TabButton>
        ))}
      </div>
      {isContentOverflowed && (
        <div className={classes['next-btn']} onClick={moveLabelsRight}>
          <NextIcon />
        </div>
      )}
    </div>
  );
};
