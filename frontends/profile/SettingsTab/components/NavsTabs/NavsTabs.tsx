import { FC, useMemo, useState } from 'react';

import { AboutTab } from '../AboutTab/AboutTab';
import { SecurityTab } from '../SecurityTab/SecurityTab';
import classes from './NavsTabs.module.scss';

const tabs = [
  {
    name: 'Siz haqingizda',
    value: 'about',
  },
  {
    name: 'Havfsizlik',
    value: 'security',
  },
];

const contents: Record<string, JSX.Element> = {
  about: <AboutTab />,
  security: <SecurityTab />,
};

export const NavsTabs: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);

  const selectTab = (value: string): void => {
    setActiveTab(value);
  };

  const content = useMemo(() => contents[activeTab], [activeTab]);

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
      <div className={classes.content}>{content}</div>
    </div>
  );
};
