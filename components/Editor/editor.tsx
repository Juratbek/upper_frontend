import EditorJs from '@editorjs/editorjs';
import { FC, useEffect, useRef, useState } from 'react';

import { EDITOR_HOLDER, IEditorProps } from './editor.types';
import { createEditor } from './services/editor.service';

export const Editor: FC<IEditorProps> = (props) => {
  const [editor, setEditor] = useState<null | EditorJs>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { handleInstance } = props;

  useEffect(() => {
    createEditor({
      ...props,
    }).then((res) => {
      setEditor(res);
      handleInstance?.(res);
    });
  }, []);

  const cleanEmptyCaptions = (): void => {
    const captions = document.querySelectorAll('.embed-tool__caption');

    captions.forEach((caption) => {
      if (!caption.textContent) {
        caption.remove();
      }
    });
  };

  // const zoomInImage = (): void => {};

  useEffect(() => {
    editor?.isReady.then(() => {
      cleanEmptyCaptions();
      // zoomInImage();
    });
  }, [editor]);

  return <div id={EDITOR_HOLDER} ref={containerRef}></div>;
};
