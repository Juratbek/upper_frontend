import { Dispatch, SetStateAction } from 'react';

import { TSetBlock } from '../context';
import { TToolType } from '../tools/tool.types';

export type TInitialBlockData = Record<string, any>;

export interface IBlockData<T = TInitialBlockData> {
  id: string;
  type: TToolType;
  data: T;
}

export interface IBlockNode<T = TInitialBlockData> extends IBlockData<T>, HTMLDivElement {}

type TSetBlocks = Dispatch<SetStateAction<IBlockData<TInitialBlockData>[]>>;

export interface IEditor {
  setBlocks: TSetBlocks;
  setBlock: TSetBlock;
}

export interface IEditorProps {
  content: {
    blocks: IBlockData[];
  };
  classes?: { root?: string };
  isEditable?: boolean;
  onChange?: (blocks: IBlockData[]) => void;
  onReady?: (editor: IEditor) => void;
  upload?: (file: File) => Promise<{ url: string }>;
}
