import { ReactNode } from 'react';

import { IBlockData, IBlockNode, IEditorProps, TInitialBlockData } from '../instance/Editor.types';
import { EDITOR_TOOLS } from '../tools/mapper';
import { TToolTag, TToolType } from '../tools/tool.types';

export interface IEditorProviderProps extends IEditorProps {
  children: ReactNode;
}

export type TAddBlock = (
  type: IBlockData['type'],
  currentBlockId: IBlockNode['id'],
  data?: IBlockData['data'],
) => void;

export type TAddBlocks = (
  blocks: Pick<IBlockData, 'type' | 'data'>[],
  currentBlockId: IBlockNode['id'],
) => void;

export type TRemoveBlock = (id: IBlockData['id']) => void;

export type TFocusPreviousText = (id: IBlockData['id']) => void;

export type TMoveBlockUp = (id: IBlockData['id']) => void;

export type TMoveBlockDown = (id: IBlockData['id']) => void;

export type TMergeWithPrevBlock = <T extends TInitialBlockData = TInitialBlockData>(
  id: IBlockData['id'],
  mergeCallback: (prevBlock: IBlockData<T>, currentBlock: IBlockData<T>) => IBlockData<T>['data'],
) => void;

export type TSetBlock = <T extends Record<string, any> = Record<string, any>>(
  block: IBlockData<T>,
) => void;

export interface IEditorAPI {
  addBlock: TAddBlock;
  addBlocks: TAddBlocks;
  setBlock: TSetBlock;
  removeBlock: TRemoveBlock;
  focusPreviousText: TFocusPreviousText;
  moveBlockUp: TMoveBlockUp;
  moveBlockDown: TMoveBlockDown;
  showInlineToolbar: (data: IInlineToolbar) => void;
  hideInlineToolbar: VoidFunction;
  mergeWithPrevBlock: TMergeWithPrevBlock;
}

export type TToolsTagsMap = Partial<Record<TToolTag, TToolType[]>>;

export interface IEditorContext<T = any>
  extends IEditorAPI,
    Required<Pick<IEditorProps, 'isEditable'>> {
  data: IBlockData<T>[];
  hoveredBlock?: IBlockNode<T>;
  focusedBlock?: IBlockData<T>;
  tools: typeof EDITOR_TOOLS;
  toolsTagsMap: TToolsTagsMap;
  inlineToolbar: IInlineToolbar;
  renderBlocks: () => ReactNode;
}

export interface IInlineToolbar {
  position?: { top: number; left: number };
}
