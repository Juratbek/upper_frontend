import { FC } from 'react';

import { IEditorAPI, IEditorContext } from '../context/EditorContext.types';
import { IBlockData, IEditorProps } from '../instance/Editor.types';

export type TToolType = 'paragraph' | 'header' | 'image' | 'list' | 'code';

export interface IToolbar {
  text: string;
  icon: string;
}

export interface IToolbarSetting extends IToolbar {
  onClick: (context: IEditorContext) => void;
}

export interface ITool {
  toolbar: IToolbar;
  block: FC<IToolProps>;
  settings?: IToolbarSetting[];
}

export type TToolsMapper = Record<TToolType, ITool>;

export interface IToolProps<T = any>
  extends IBlockData<T>,
    Required<Pick<IEditorProps, 'isEditable'>> {
  api: IEditorAPI;
}
