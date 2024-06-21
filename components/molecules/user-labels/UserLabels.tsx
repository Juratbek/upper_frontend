import { useAuth, useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useGetCurrentBlogTags } from 'store/clients/blog';
import { PopularLabels } from 'variables';

import { Labels } from '../labels';
import {
  DefaultLabel,
  ForYouLabel,
  LABEL_ID_PARAM,
  LastPublished,
  TopLabel,
} from './UserLabels.constants';

export const UserLabels = (): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const { setParam } = useUrlParams();
  const { query } = useRouter();
  const fetchCurrentBlogTagsRes = useGetCurrentBlogTags();

  const labelSelectHandler = (label: string): void => {
    setParam(LABEL_ID_PARAM, label);
  };

  const labels = useMemo(() => {
    const labels: string[] = [LastPublished, TopLabel];

    if (isAuthenticated) labels.push(ForYouLabel);

    const { data, isSuccess } = fetchCurrentBlogTagsRes;
    if (isSuccess) {
      const userLabels = data ?? [];
      const userLabelsSet = new Set(userLabels);
      let popularLabelIndex = 0;
      while (userLabels.length < PopularLabels.length) {
        const popularLabel = PopularLabels[popularLabelIndex];
        if (!userLabelsSet.has(popularLabel)) userLabels.push(popularLabel);
        popularLabelIndex++;
      }
    }
    if (data?.length) labels.push(...data);

    return labels;
  }, [isAuthenticated, fetchCurrentBlogTagsRes]);

  return (
    <Labels
      labels={labels}
      activeLabel={(query[LABEL_ID_PARAM] ?? DefaultLabel) as string}
      onSelect={labelSelectHandler}
    />
  );
};
