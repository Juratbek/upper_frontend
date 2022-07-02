import { useUrlParams } from 'hooks';
import { FC, useMemo } from 'react';

import { ITabBodyProps } from './TabBody.types';

export const TabBody: FC<ITabBodyProps> = ({ tabs, param, ...props }) => {
  const { getParam } = useUrlParams();

  const getActiveTab = (): FC => {
    const activeTabId = getParam(param);
    if (typeof activeTabId === 'string') {
      return tabs[activeTabId];
    }
    return tabs[Object.keys(tabs)[0]];
  };

  const ActiveTab = useMemo(getActiveTab, [getParam(param)]);

  return <ActiveTab {...props} />;
};
