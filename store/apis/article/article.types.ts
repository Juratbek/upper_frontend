import { OutputBlockData } from '@editorjs/editorjs';
import { IDirection, IField, ILabel } from 'types';

export interface ICreateArticleDto {
  title: string;
  blocks: OutputBlockData[];
  labels: ILabel[];
  field?: IField;
  directions?: IDirection[];
}
export interface IUpdateArticleDto {
  id: number;
  title: string;
  blocks: OutputBlockData[];
  labels: ILabel[];
}
