import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import { useLazyGetCurrentBlogQuery } from 'store/apis';
import { PROFILE_TAB_IDS } from 'variables/Profile.constants';

import { AboutTab } from '../AboutTab/AboutTab';
import { SecurityTab } from '../SecurityTab/SecurityTab';
import { SupportTab } from '../SupportTab/SupportTab';
import classes from './NavsTabs.module.scss';
import { INavTab } from './NavsTabs.types';

const tabs = [
  {
    name: 'Siz haqingizda',
    value: 'about',
  },
  {
    name: "Rag'batlantirish",
    value: 'support',
  },
  {
    name: 'Havfsizlik',
    value: 'security',
  },
];

const contents: Record<string, FC<INavTab>> = {
  about: AboutTab,
  security: SecurityTab,
  support: SupportTab,
};

export const NavsTabs: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);
  const [fetchCurrentBlog, currentBlogRes] = useLazyGetCurrentBlogQuery();
  const {
    query: { tab },
  } = useRouter();

  const selectTab = (value: string): void => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (tab && tab === PROFILE_TAB_IDS.settings) {
      fetchCurrentBlog();
    }
  }, [tab]);

  const Content = useMemo(() => contents[activeTab], [activeTab]);

  return (
    <div className='d-flex w-100'>
      <nav className={classes.navs}>
        {tabs.map((tab) => (
          <div
            className={`${classes.tab} ${tab.value === activeTab && classes['tab--active']}`}
            key={tab.value}
            onClick={(): void => selectTab(tab.value)}
          >
            {tab.name}
          </div>
        ))}
      </nav>
      <div className={classes.content}>
        <Content currentBlog={currentBlogRes.data} res={currentBlogRes} />
      </div>
    </div>
  );
};
