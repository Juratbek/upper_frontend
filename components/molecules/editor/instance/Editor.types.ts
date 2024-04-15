import { TToolType } from '../tools/tool.types';

export type TInitialBlockData = Record<string, any>;

export interface IBlockData<T = TInitialBlockData> {
  id: string;
  type: TToolType;
  data: T;
}

export interface IBlockNode<T = TInitialBlockData> extends IBlockData<T>, HTMLDivElement {}

export interface IEditorProps {
  content: {
    blocks: IBlockData[];
  };
  isEditable?: boolean;
}
