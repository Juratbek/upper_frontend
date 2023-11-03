import { TabButton } from 'components/lib';
import { useAuth, useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';
import { useGetCurrentBlogLabels } from 'store/clients/blog';
import { ICONS } from 'variables';

import { ForYouLabel, LABEL_ID_PARAM, TopLabel } from '../../Home.constants';
import classes from './Labels.module.scss';

const NextIcon = ICONS.next;

export const Labels = (): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const { setParam } = useUrlParams();
  const { query } = useRouter();
  const labelsContainerRef = useRef<HTMLDivElement>(null);
  const fetchCurrentBlogLabelsRes = useGetCurrentBlogLabels();

  const labelSelectHandler = (id: number | string) => (): void => {
    setParam(LABEL_ID_PARAM, id);
  };

  const labels = useMemo(() => {
    const labels: { id: number | string; name: string }[] = [TopLabel];

    if (isAuthenticated) labels.unshift(ForYouLabel);

    const { data } = fetchCurrentBlogLabelsRes;
    if (data?.length) labels.push(...data);

    return labels;
  }, [isAuthenticated, fetchCurrentBlogLabelsRes]);

  const moveLabelsRight = (): void => {
    const labelsContainer = labelsContainerRef.current;
    if (!labelsContainer) return;
    const leftScroll = labelsContainer.scrollLeft;
    labelsContainer.scrollTo({ left: leftScroll + 600, behavior: 'smooth' });
  };

  return (
    <div className={classes.root}>
      <div className={classes['labels-container']} id='labels' ref={labelsContainerRef}>
        {labels.map((label) => (
          <TabButton
            onClick={labelSelectHandler(label.id)}
            color={label.id == query.label ? 'primary' : 'outlined'}
            key={label.id}
          >
            {label.name}
          </TabButton>
        ))}
      </div>
      <div className={classes['next-btn']} onClick={moveLabelsRight}>
        <NextIcon />
      </div>
    </div>
  );
};
