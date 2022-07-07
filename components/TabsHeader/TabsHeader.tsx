import { useUrlParams } from 'hooks';
import { FC, useEffect } from 'react';
import { ITabHeader } from 'types';
import { TAB_PARAM_NAME } from 'variables';

import classes from './TabsHeader.module.css';
import { ITabsHeaderProps } from './TabsHeader.types';

export const TabsHeader: FC<ITabsHeaderProps> = (props) => {
  const { param = TAB_PARAM_NAME, tabs = [] } = props;
  const { getParam, setParam, isReady } = useUrlParams();
  const activeTabId = getParam(param);

  const changeActiveTab = (id: string): void => {
    setParam(param, id);
  };

  const getTabs = (): ITabHeader[] => {
    if (typeof activeTabId !== 'string') return tabs;
    return tabs.map((tab) => ({ ...tab, active: tab.id === activeTabId }));
  };

  useEffect(() => {
    if (!activeTabId && isReady) {
      changeActiveTab(tabs[0].id);
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
