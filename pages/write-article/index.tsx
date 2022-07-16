import EditorJs from '@editorjs/editorjs';
import { createEditor } from 'frontends/EditorJs';
import { EDITOR_HOLDER } from 'frontends/EditorJs';
import { useEffect, useState } from 'react';

export default function WriteArticlePage(): JSX.Element {
  const [editor, setEditor] = useState<EditorJs | null>(null);

  useEffect(() => {
    createEditor().then((editor) => setEditor(editor));
  }, []);

  return (
    <>
      <div id={EDITOR_HOLDER}></div>
    </>
  );
}
