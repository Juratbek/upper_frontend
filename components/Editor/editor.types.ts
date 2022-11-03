import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';

export interface IEditorProps {
  changeHandler?: EditorConfig['onChange'];
  isEditable?: boolean;
  content?: OutputData;
  placeholder?: string;
  handleInstance?: (editor: EditorJS) => void;
}

export const EDITOR_HOLDER = 'editorjs';
export const EDITOR_PLACEHOLDER = 'Hikoyangizni yozing...';

export interface IUploadedImage {
  success: number;
  file: {
    url: string;
  };
}
