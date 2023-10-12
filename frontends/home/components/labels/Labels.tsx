import { TabButton } from 'components';
import { useAuth, useTheme, useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useLazyGetCurrentBlogLabelsQuery } from 'store/apis';

import { ForYouLabel, LABEL_ID_PARAM, TopLabel } from '../../Home.constants';
import classes from './Labels.module.scss';

export const Labels = (): JSX.Element => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const { setParam } = useUrlParams();
  const { query } = useRouter();
  const [fetchCurrentBlogLabels, fetchCurrentBlogLabelsRes] = useLazyGetCurrentBlogLabelsQuery();

  const labelSelectHandler = (id: number | string) => (): void => {
    setParam(LABEL_ID_PARAM, id);
  };

  const labels = useMemo(() => {
    const labels: { id: number | string; name: string }[] = [TopLabel];

    if (isAuthenticated) labels.unshift(ForYouLabel);

    const { data, isSuccess } = fetchCurrentBlogLabelsRes;
    if (isSuccess) labels.push(...data);

    return labels;
  }, [isAuthenticated, fetchCurrentBlogLabelsRes]);

  useEffect(() => {
    isAuthenticated && fetchCurrentBlogLabels();
  }, [isAuthenticated]);

  useEffect(() => {
    const listener = (): void => {
      const labelsDiv = document.getElementById('labels');
      if (window.scrollY > 50) {
        labelsDiv?.classList.add(classes.scrolled);
      } else {
        labelsDiv?.classList.remove(classes.scrolled);
      }
      console.log(window.scrollY);
    };
    window.addEventListener('scroll', listener);

    return () => window.removeEventListener('scroll', listener);
  }, []);

  return (
    <div className={`${classes['labels-container']} ${classes[theme]}`} id='labels'>
      {[...labels, ...labels, ...labels].map((label) => (
        <TabButton
          onClick={labelSelectHandler(label.id)}
          color={label.id == query.label ? 'primary' : 'outlined'}
          key={label.id}
        >
          {label.name}
        </TabButton>
      ))}
    </div>
  );
};
