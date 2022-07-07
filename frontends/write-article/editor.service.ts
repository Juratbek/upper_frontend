import EditorJs from '@editorjs/editorjs';

export interface ICreateEditorProps {
  holder?: string;
  onChangeHandler?(...args: any[]): void;
  isReadOnly?: boolean;
  data?: any;
}

export const createEditor = async ({
  holder = 'editorjs',
  onChangeHandler,
  isReadOnly = false,
  data = { blocks: [] },
}: ICreateEditorProps = {}): Promise<EditorJs> => {
  const EditorJs = (await import('@editorjs/editorjs')).default;
  const Embed = (await import('@editorjs/embed')).default;
  const Header = (await import('@editorjs/header')).default;
  const ImageTool = (await import('@editorjs/image')).default;
  const List = (await import('@editorjs/list')).default;
  return new EditorJs({
    holder: holder,
    onChange: onChangeHandler,
    readOnly: isReadOnly,
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
    },
  });
};
