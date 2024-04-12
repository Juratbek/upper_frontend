import { ReactNode } from 'react';

import { IBlockData, IBlockNode, IEditorProps } from '../instance/Editor.types';
import { EDITOR_TOOLS } from '../tools/mapper';

export interface IEditorProviderProps extends IEditorProps {
  children: ReactNode;
}

export type TAddBlock = (type: IBlockData['type'], currentBlockId: IBlockNode['id']) => void;

export type TRemoveBlock = (id: IBlockData['id']) => void;

export type TFocusPreviousText = (id: IBlockData['id']) => void;

export type TMoveBlockUp = (id: IBlockData['id']) => void;

export type TMoveBlockDown = (id: IBlockData['id']) => void;

export type TSetBlock = <T>(block: IBlockData<T>) => void;

export interface IEditorAPI {
  addBlock: TAddBlock;
  setBlock: TSetBlock;
  removeBlock: TRemoveBlock;
  focusPreviousText: TFocusPreviousText;
  moveBlockUp: TMoveBlockUp;
  moveBlockDown: TMoveBlockDown;
}

export interface IEditorContext extends IEditorAPI {
  data: IBlockData[];
  hoveredBlock?: IBlockNode;
  tools: typeof EDITOR_TOOLS;
  renderBlocks: () => ReactNode;
}
