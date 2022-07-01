import { useUrlParams } from 'hooks';
import { FC, useEffect } from 'react';
import { ITabHeader } from 'types';

import classes from './TabsHeader.module.css';
import { ITabsHeaderProps } from './TabsHeader.types';

export const TabsHeader: FC<ITabsHeaderProps> = (props) => {
  const { getParam, setParam } = useUrlParams();
  const activeTabId = getParam(props.param);

  const changeActiveTab = (id: string): void => {
    setParam(props.param, id);
  };

  const getTabs = (): ITabHeader[] => {
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
