import { ReactNode } from 'react';

import { IBlockData, IBlockNode, IEditorProps } from '../instance/Editor.types';
import { EDITOR_TOOLS } from '../tools/mapper';

export interface IEditorProviderProps extends IEditorProps {
  children: ReactNode;
}

export type TAddBlock = (type: IBlockData['type'], currentBlock: IBlockNode) => void;

export interface IEditorContext {
  data: IBlockData[];
  hoveredBlock?: IBlockNode;
  tools: typeof EDITOR_TOOLS;
  renderBlocks: () => ReactNode;
  addBlock: TAddBlock;
}
