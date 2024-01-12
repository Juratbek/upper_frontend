import { useAuth, useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useGetCurrentBlogTags } from 'store/clients/blog';

import { Labels } from '../labels';
import { ForYouLabel, LABEL_ID_PARAM, TopLabel } from './UserLabels.constants';

export const UserLabels = (): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const { setParam } = useUrlParams();
  const { query } = useRouter();
  const fetchCurrentBlogTagsRes = useGetCurrentBlogTags();

  const labelSelectHandler = (label: string): void => {
    setParam(LABEL_ID_PARAM, label);
  };

  const labels = useMemo(() => {
    const labels: string[] = [TopLabel];

    if (isAuthenticated) labels.unshift(ForYouLabel);

    const { data } = fetchCurrentBlogTagsRes;
    if (data?.length) labels.push(...data);

    return labels;
  }, [isAuthenticated, fetchCurrentBlogTagsRes]);

  return (
    <Labels
      labels={labels}
      activeLabel={query[LABEL_ID_PARAM] as string}
      onSelect={labelSelectHandler}
    />
  );
};
