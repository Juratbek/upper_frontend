import EditorJs from '@editorjs/editorjs';

import { EDITOR_HOLDER, EDITOR_PLACEHOLDER, IEditorProps } from '../editor.types';
import { getTools } from './editor-tools';

export const createEditor = async ({
  holder = EDITOR_HOLDER,
  changeHandler,
  editable = true,
  content = { blocks: [] },
  placeholder = EDITOR_PLACEHOLDER,
}: IEditorProps = {}): Promise<EditorJs> => {
  const editorJS = (await import('@editorjs/editorjs')).default;
  const tools = await getTools();

  return new editorJS({
    holder,
    onChange: changeHandler,
    readOnly: !editable,
    placeholder,
    data: content,
    tools,
  });
};
