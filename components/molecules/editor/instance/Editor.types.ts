import { TToolType } from '../tools/tool.types';

export interface IBlockData<T = Record<string, any>> {
  id: string;
  type: TToolType;
  data: T;
}

export interface IBlockNode<T = Record<string, any>> extends IBlockData<T>, HTMLDivElement {}

export interface IEditorProps {
  content: {
    blocks: IBlockData[];
  };
  isEditable?: boolean;
}
