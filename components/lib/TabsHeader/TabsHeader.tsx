import { useUrlParams } from 'hooks';
import { FC, useEffect } from 'react';
import { ITabHeader } from 'types';
import { TAB_PARAM_NAME } from 'variables';

import classes from './TabsHeader.module.scss';
import { ITabsHeaderProps } from './TabsHeader.types';

export const TabsHeader: FC<ITabsHeaderProps> = (props) => {
  const { param = TAB_PARAM_NAME, tabs = [] } = props;
  const { getParam, setParam, isReady } = useUrlParams();
  const activeTabId = getParam(param);

  const changeActiveTab = (tab: ITabHeader): void => {
    setParam(param, tab.id);
    props.onChange?.(tab);
  };

  const getTabs = (): ITabHeader[] => {
    if (typeof activeTabId !== 'string') return tabs;
    return tabs.map((tab) => ({ ...tab, active: tab.id === activeTabId }));
  };

  useEffect(() => {
    if (Boolean(activeTabId) || !isReady || tabs.length === 0) return;
    const defaultAvticeTab = tabs.find((tab) => tab.defaultSelected) || tabs[0];
    console.log('🚀 ~ file: TabsHeader.tsx:27 ~ useEffect ~ defaultAvticeTab', defaultAvticeTab);
    defaultAvticeTab && setParam(param, defaultAvticeTab.id);
  }, [tabs]);

  return (
    <div className={classes.tabs}>
      {getTabs().map((tab) => (
        <span
          onClick={(): void => changeActiveTab(tab)}
          className={`${classes.tab} ${tab.active && classes.active}`}
          key={tab.id}
        >
          {tab.name}
        </span>
      ))}
    </div>
  );
};
