import { ITutorialSection, ITutorialSectionItem } from 'types/section';

export interface ISectionItemProps {
  item: ITutorialSectionItem;
  section: ITutorialSection;
  onClick?: () => void;
}
