import { ITabHeader } from 'types';

export interface ITabsHeaderProps {
  tabs?: ITabHeader[];
  activeTab?: string;
  onChange?: (tab: ITabHeader) => void;
}
