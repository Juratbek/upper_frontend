import { FC } from 'react';

import { TAddBlock } from '../context/EditorContext.types';
import { IBlockData, IEditorProps } from '../instance/Editor.types';

export type TToolType = 'paragraph' | 'header' | 'image' | 'list' | 'code';

export interface IToolbar {
  text: string;
  icon: string;
}

export interface ITool {
  toolbar: IToolbar;
  block: FC<IToolProps>;
}

export interface IToolProps<T = any>
  extends IBlockData<T>,
    Required<Pick<IEditorProps, 'isEditable'>> {
  api: {
    addBlock: TAddBlock;
  };
}
