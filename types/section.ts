export interface ITutorialSectionItem {
  id: string;
  name: string;
  defaultFocused?: boolean;
  target?: ITutorialSectionItem;
  articleId?: number;
}

export interface ITutorialSection {
  id: string;
  name: string;
  items: ITutorialSectionItem[];
  defaultFocused?: boolean;
  target?: ITutorialSection;
}
