import { ITutorialSection, ITutorialSectionItem } from 'types';

export interface IAddSectionByTargetPayloadAction {
  targetSection: ITutorialSection;
  newSection: ITutorialSection;
}

export interface IAddTutorialArticlePayloadAction {
  section: ITutorialSection;
  article: ITutorialSectionItem;
}

export interface IAddTutorialArticleBytargetPayloadAction {
  section: ITutorialSection;
  target: ITutorialSectionItem;
}
