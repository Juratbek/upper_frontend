import { useUrlParams } from 'hooks';
import { FC, useEffect } from 'react';
import { ITab } from 'types';

import { TAB_PARAM_NAME } from './Tabs.constants';
import classes from './Tabs.module.css';
import { ITabsProps } from './Tabs.types';

export const Tabs: FC<ITabsProps> = (props) => {
  const { getParam, setParam } = useUrlParams();
  const activeTabId = getParam(TAB_PARAM_NAME);

  const changeActiveTab = (id: string): void => {
    setParam(TAB_PARAM_NAME, id);
  };

  const getTabs = (): ITab[] => {
    const tabs = props.tabs || [];
    if (typeof activeTabId !== 'string') return tabs;
    return tabs.map((tab) => ({ ...tab, active: tab.id === activeTabId }));
  };

  useEffect(() => {
    if (!activeTabId) {
      changeActiveTab('articles');
    }
  }, []);

  return (
    <div className={classes.tabs}>
      {getTabs().map((tab, index) => (
        <span
          onClick={(): void => changeActiveTab(tab.id)}
          className={`${classes.tab} ${tab.active && classes.active}`}
          key={index}
        >
          {tab.name}
        </span>
      ))}
    </div>
  );
};
