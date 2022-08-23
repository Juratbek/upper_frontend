import EditorJs from '@editorjs/editorjs';
import { articleData } from 'frontends/write-article/sample-article';
import { FC, useEffect, useRef, useState } from 'react';
import { createEditor, EDITOR_HOLDER__READ } from 'utils';

import { IEditorProps } from './Editor.types';

export const Editor: FC<IEditorProps> = ({ readOnly }) => {
  console.log('🚀 ~ file: Editor.tsx ~ line 42 ~ readOnly', readOnly);
  const { content } = { content: articleData };
  const [editor, setEditor] = useState<null | EditorJs>(null);
  const articleContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content) {
      createEditor({
        holder: EDITOR_HOLDER__READ,
        data: content,
        isReadOnly: readOnly,
      }).then((res) => setEditor(res));
    }
  }, [content, readOnly]);

  // Caption cleanup
  useEffect(() => {
    editor?.isReady.then(() => {
      const captions = document.querySelectorAll('.embed-tool__caption');

      captions.forEach((caption) => {
        if (!caption.textContent) {
          caption.remove();
        }
      });
    });
  }, [editor]);

  return (
    <div ref={articleContainer}>
      <div id={EDITOR_HOLDER__READ}></div>
    </div>
  );
};
