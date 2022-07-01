import { useUrlParams } from 'hooks';
import { FC } from 'react';

import { TAB_PARAM_NAME } from './Tabs.constants';
import classes from './Tabs.module.css';
import { ITabsProps } from './Tabs.types';

export const Tabs: FC<ITabsProps> = ({ tabs = [] }) => {
  const { getParam, setParam } = useUrlParams();

  const checkTabStatus = (id: string): boolean => {
    const activeTab = getParam(TAB_PARAM_NAME);
    if (typeof activeTab === 'string') {
      return activeTab === id;
    }
    return false;
  };

  const changeActiveTab = (id: string): void => {
    setParam(TAB_PARAM_NAME, id);
  };

  return (
    <div className={classes.tabs}>
      {tabs.map((tab, index) => (
        <span
          onClick={(): void => changeActiveTab(tab.id)}
          className={`${classes.tab} ${checkTabStatus(tab.id) && classes.active}`}
          key={index}
        >
          {tab.name}
        </span>
      ))}
    </div>
  );
};
