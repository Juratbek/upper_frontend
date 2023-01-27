import { TRootState } from 'store/store';
import { ITutorialSection } from 'types';

export const getTutorialName = (store: TRootState): string => store.tutorialsSidebar.name;

export const getTutorialSections = (store: TRootState): ITutorialSection[] =>
  store.tutorialsSidebar.sections;

export const getIsRemoveArticleModalOpen = (store: TRootState): boolean =>
  store.tutorialsSidebar.isRemoveArticleModalOpen;

export const getIsPublishTutorialModalOpen = (store: TRootState): boolean =>
  store.tutorialsSidebar.isPublishTutorialModalOpen;

export const getIsRemoveSectionModalOpen = (store: TRootState): boolean =>
  store.tutorialsSidebar.isRemoveSectionModalOpen;
