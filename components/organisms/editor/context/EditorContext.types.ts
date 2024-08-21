import { Dispatch, ReactNode, SetStateAction } from 'react';

import { IBlockData, IBlockNode, IEditorProps, TInitialBlockData } from '../instance/Editor.types';
import { EDITOR_TOOLS } from '../tools/mapper';
import { TToolTag, TToolType } from '../tools/tool.types';

export interface IEditorProviderProps extends IEditorProps {
  children: ReactNode;
}

export type TAddBlock = (
  type: IBlockData['type'],
  currentBlockId?: IBlockNode['id'],
  data?: IBlockData['data'],
) => Promise<IBlockData>;

export type TAddBlocks = (
  blocks: Pick<IBlockData, 'type' | 'data'>[],
  currentBlockId: IBlockNode['id'],
) => void;

export type TRemoveBlock = (id: IBlockData['id']) => Promise<{
  blocks: IBlockData<TInitialBlockData>[];
  prevBlocks: IBlockData<TInitialBlockData>[];
}>;

export type TFocusPreviousBlock = (
  id: IBlockData['id'],
  options?: { leftOffsetPx?: number },
) => void;

export type TMoveBlockUp = (id: IBlockData['id']) => void;

export type TMoveBlockDown = (id: IBlockData['id']) => void;

export type TMergeWithPrevBlock = <T extends TInitialBlockData = TInitialBlockData>(
  id: IBlockData['id'],
  mergeCallback: (prevBlock: IBlockData<T>, currentBlock: IBlockData<T>) => IBlockData<T>['data'],
) => void;

export type TSetBlock = <T extends Record<string, any> = Record<string, any>>(
  block: IBlockData<T>,
) => void;

export type TSetEditorBlocks = Dispatch<SetStateAction<IBlockData[]>>;

export interface INavigationCallbacks {
  focusPreviousBlock: TFocusPreviousBlock;
}

export interface IEditorAPI {
  addBlock: TAddBlock;
  addBlocks: TAddBlocks;
  setBlock: TSetBlock;
  removeBlock: TRemoveBlock;
  moveBlockUp: TMoveBlockUp;
  moveBlockDown: TMoveBlockDown;
  showInlineToolbar: (data: IInlineToolbar) => void;
  hideInlineToolbar: VoidFunction;
  mergeWithPrevBlock: TMergeWithPrevBlock;
}

export type TToolsTagsMap = Partial<Record<TToolTag, TToolType[]>>;

export interface IEditorContext<T = any>
  extends IEditorAPI,
    INavigationCallbacks,
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
