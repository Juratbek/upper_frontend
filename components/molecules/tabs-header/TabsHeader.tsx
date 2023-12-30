import { FC } from 'react';
import { ITabHeader } from 'types';

import classes from './TabsHeader.module.scss';
import { ITabsHeaderProps } from './TabsHeader.types';

export const TabsHeader: FC<ITabsHeaderProps> = (props) => {
  const { tabs = [], activeTab } = props;

  const changeActiveTab = (tab: ITabHeader): void => {
    props.onChange?.(tab);
  };

  return (
    <div className={classes.tabs}>
      {tabs.map((tab) => (
        <button
          onClick={(): void => changeActiveTab(tab)}
          className={`${classes.tab} ${activeTab === tab.id && classes.active}`}
          key={tab.id}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};
