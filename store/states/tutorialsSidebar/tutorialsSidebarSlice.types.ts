import { ITutorialArticle, ITutorialSection } from 'types';

export interface IAddSectionByTargetPayloadAction {
  targetSection: ITutorialSection;
  newSection: ITutorialSection;
}

export interface IAddTutorialArticlePayloadAction {
  section: ITutorialSection;
  article: ITutorialArticle;
}

export interface IAddTutorialArticleBytargetPayloadAction {
  section: ITutorialSection;
  target: ITutorialArticle;
  article: ITutorialArticle;
}
