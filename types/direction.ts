import { ILabel } from './label';

export interface IDirection {
  id: number;
  name: string;
  labels?: ILabel[];
}
