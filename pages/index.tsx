import { Button, TabBody, TabsHeader } from 'components';
import { HOME_TAB_MENUS, HOME_TABS } from 'frontends/home';
import classes from 'frontends/home/Home.module.scss';
import { useAuth, useUrlParams } from 'hooks';
import type { NextPage } from 'next';
import { useEffect, useMemo } from 'react';
import { useLazyGetCurrentBlogLabelsQuery } from 'store/apis';

const Home: NextPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { setParam } = useUrlParams();
  const [fetchCurrentBlogLabels, fetchCurrentBlogLabelsRes] = useLazyGetCurrentBlogLabelsQuery();
  const { data: labels = [] } = fetchCurrentBlogLabelsRes;

  const labelSelectHandler = (id: number): void => {
    setParam('labelId', id);
  };

  useEffect(() => {
    isAuthenticated && fetchCurrentBlogLabels();
  }, [isAuthenticated]);

  const tabMenus = useMemo(() => {
    if (isLoading) return [];
    return isAuthenticated ? HOME_TAB_MENUS : HOME_TAB_MENUS.filter((menu) => !menu.private);
  }, [isAuthenticated]);

  return (
    <div className='container'>
      <h1 className='mb-1'>UPPER - Yanada yuqoriroq</h1>
      <TabsHeader tabs={tabMenus} />
      <div className={classes['labels-container']}>
        {labels.map((label) => (
          <Button
            onClick={(): void => labelSelectHandler(label.id)}
            size='small'
            className='me-1'
            key={label.id}
          >
            {label.name}
          </Button>
        ))}
      </div>
      <TabBody tabs={HOME_TABS} />
    </div>
  );
};

export default Home;
