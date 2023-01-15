import { OutputBlockData } from '@editorjs/editorjs';
import { ILabel, ITutorialSection } from 'types';

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

export interface IAddSectionDto {
  tutorialId: number;
  newSection: ITutorialSection;
  targetSection?: ITutorialSection;
}
export interface IEditSectionDto {
  tutorialId: number;
  section: ITutorialSection;
}
