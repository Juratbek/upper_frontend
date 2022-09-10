import { OutputBlockData } from '@editorjs/editorjs';
import { ILabel } from 'types';

export interface ICreateArticleDto {
  id?: number;
  title: string;
  blocks: OutputBlockData[];
  labels: ILabel[];
}
