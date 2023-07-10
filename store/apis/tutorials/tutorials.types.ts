import { OutputBlockData } from '@editorjs/editorjs';
import { ILabel, ITutorialSection, ITutorialSectionItem } from 'types';

export interface ICreateArticleDto {
  title: string;
  blocks: OutputBlockData[];
  labels: ILabel[];
}
export interface IUpdateArticleDto {
  id: number;
  title: string;
  blocks: OutputBlockData[];
  labels: ILabel[];
}

export interface ISaveSectionDto {
  tutorialId: number;
  section: ITutorialSection;
  targetSection?: ITutorialSection;
}

export interface ISaveSectionItemDto {
  tutorialId: number;
  sectionId: string;
  item: ITutorialSectionItem;
  targetItem?: ITutorialSectionItem;
}

export interface IChangeTutorialSelectedArticleDto {
  tutorialId: number;
  sectionId: string;
  articleId: string;
  selectedArticleId: number;
}

export interface IRemoveSectionDto {
  tutorialId: number;
  sectionId: string;
}

export interface IRemoveArticleDto {
  tutorialId: number;
  articleId: string;
}
