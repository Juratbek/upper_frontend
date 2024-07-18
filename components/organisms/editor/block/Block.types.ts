import { ReactNode } from 'react';

import { IBlockData, IBlockNode } from '../instance/Editor.types';

export interface IBlockProps extends IBlockData {
  children: ReactNode;
  onMouseEnter?: (block: IBlockNode) => void;
  onClick?: (block: IBlockData) => void;
  onFocus?: (block: IBlockData) => void;
}
