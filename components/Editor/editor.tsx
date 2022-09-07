import EditorJs from '@editorjs/editorjs';
import { FC, useEffect, useState } from 'react';

import { EDITOR_HOLDER, IEditorProps } from './editor.types';
import { createEditor } from './services/editor.service';

export const Editor: FC<IEditorProps> = (props) => {
  const [editor, setEditor] = useState<null | EditorJs>(null);

  const { handleInstance, holder } = props;

  useEffect(() => {
    createEditor({
      ...props,
    }).then((res) => {
      setEditor(res);
      handleInstance?.(res);
    });
  }, []);

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

  return <div id={holder || EDITOR_HOLDER}></div>;
};
