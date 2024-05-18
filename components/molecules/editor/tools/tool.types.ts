import { FC } from 'react';

import { IEditorAPI, IEditorContext } from '../context/EditorContext.types';
import { IBlockData, IEditorProps } from '../instance/Editor.types';

export type TToolType =
  | 'paragraph'
  | 'header'
  | 'image'
  | 'list'
  | 'code'
  | 'alert'
  | 'quote'
  | 'delimiter'
  | 'unsplash'
  | 'figure'
  | 'frame'
  | 'table';

export interface IToolbar {
  text: string;
  icon: string;
}

export interface IToolbarSetting<T = any> extends IToolbar {
  onClick: (context: IEditorContext<T>) => void;
  active?: (context: IEditorContext<T>) => boolean;
  className?: string;
  shouldBeConfirmed?: 'danger';
}

export type TToolTag = keyof HTMLElementTagNameMap | '#text';

export interface ITool {
  toolbar?: IToolbar;
  block: FC<IToolProps<any>>;
  settings?: IToolbarSetting[];
  config?: Record<string, any>;
  initialData?: Record<string, any>;
  sanitize?: (data: IBlockData['data']) => IBlockData['data'];
  inlineToolEnabled?: boolean;
  tags?: Array<TToolTag>;
  onPaste?: (node: Node) => IBlockData['data'] | null;
}

export type TToolsMapper = Record<TToolType, ITool>;

export interface IToolProps<T> extends IBlockData<T>, Required<Pick<IEditorProps, 'isEditable'>> {
  api: IEditorAPI;
}
