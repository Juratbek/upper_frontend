import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';

export interface IEditorProps {
  changeHandler?: EditorConfig['onChange'];
  isEditable?: boolean;
  content?: OutputData;
  placeholder?: string;
  handleInstance?: (editor: EditorJS) => void;
  autoFocus?: boolean;
}

export const EDITOR_HOLDER = 'editorjs';
export const EDITOR_PLACEHOLDER = 'Keling bilim ulashamiz...';

export const CAPTION_CLASSES = {
  imageToolCaption: 'image-tool__caption',
  inlineImageCaption: 'inline-image__caption',
  embedToolCaption: 'embed-tool__caption',
};
export const IMAGE_CONTAINER_CLASSES = { inlineImage: 'inline-image', imageTool: 'image-tool' };

export interface IUploadedImage {
  success: number;
  file: {
    url: string;
  };
}
