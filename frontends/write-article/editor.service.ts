import EditorJs, { OutputData } from '@editorjs/editorjs';

import { EDITOR_HOLDER, EDITOR_PLACEHOLDER } from '../../utils/editor/editor.constants';

export interface ICreateEditorProps {
  holder?: string;
  onChangeHandler?(...args: any[]): void;
  isReadOnly?: boolean;
  data?: OutputData;
  placeholder?: string;
}

export const createEditor = async ({
  holder = EDITOR_HOLDER,
  onChangeHandler,
  isReadOnly = false,
  data = { blocks: [] },
  placeholder = EDITOR_PLACEHOLDER,
}: ICreateEditorProps = {}): Promise<EditorJs> => {
  const EditorJs = (await import('@editorjs/editorjs')).default;
  const Embed = (await import('@editorjs/embed')).default;
  const Header = (await import('@editorjs/header')).default;
  const ImageTool = (await import('@editorjs/image')).default;
  const List = (await import('@editorjs/list')).default;
  const Tooltip = (await import('editorjs-tooltip')).default;
  const TextColor = (await import('editorjs-text-color-plugin')).default;

  return new EditorJs({
    holder: holder,
    onChange: onChangeHandler,
    readOnly: isReadOnly,
    placeholder: placeholder,
    data: data,
    tools: {
      header: {
        class: Header,
        shortcut: 'CMD+SHIFT+H',
        config: {
          levels: [1, 2, 3, 4, 5, 6],
          defaultLevel: 1,
        },
      },
      list: List,
      image: ImageTool,
      embed: {
        class: Embed,
        inlineToolbar: true,
      },
      tooltip: {
        class: Tooltip,
        inlineToolbar: true,
        config: {
          underline: true,
        },
      },
      textColor: {
        class: TextColor,
        inlineToolbar: true,
      },
    },
  });
};
