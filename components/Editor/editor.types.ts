import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';

export interface IEditorProps {
  changeHandler?: EditorConfig['onChange'];
  editable?: boolean;
  content?: OutputData;
  placeholder?: string;
  handleInstance?: (editor: EditorJS) => void;
}

export const EDITOR_HOLDER = 'editorjs';
export const EDITOR_PLACEHOLDER = 'Hikoyangizni yozing...';
