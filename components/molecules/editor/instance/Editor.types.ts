import { TToolType } from '../tools/tool.types';

export interface IBlockData<T = any> {
  id: string;
  type: TToolType;
  data: T;
}

export interface IBlockNode<T = any> extends IBlockData<T>, HTMLDivElement {}

export interface IEditorProps {
  content: {
    blocks: IBlockData[];
  };
  isEditable?: boolean;
}
