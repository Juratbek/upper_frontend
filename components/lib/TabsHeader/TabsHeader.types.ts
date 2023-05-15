import { ITabHeader } from 'types';

export interface ITabsHeaderProps {
  tabs?: ITabHeader[];
  param?: string;
  onChange?: (tab: ITabHeader) => void;
}
