import { TRootState } from 'store/store';
import { ISection } from 'types';

export const getTutorialName = (store: TRootState): string => store.tutorialsSidebar.name;

export const getTutorialSections = (store: TRootState): ISection[] =>
  store.tutorialsSidebar.sections;

export const getIsRemoveArticleModalOpen = (store: TRootState): boolean =>
  store.tutorialsSidebar.isRemoveArticleModalOpen;

export const getIsRemoveSectionModalOpen = (store: TRootState): boolean =>
  store.tutorialsSidebar.isRemoveSectionModalOpen;
