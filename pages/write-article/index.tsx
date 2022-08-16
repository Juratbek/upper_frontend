import EditorJs from '@editorjs/editorjs';
import { createEditor } from 'frontends/write-article';
import { EDITOR_HOLDER } from 'frontends/write-article';
import { useEffect, useState } from 'react';

export default function WriteArticlePage(): JSX.Element {
  const [, setEditor] = useState<EditorJs | null>(null);

  useEffect(() => {
    createEditor().then((editor) => setEditor(editor));
  }, []);

  return (
    <>
      <div id={EDITOR_HOLDER}></div>
    </>
  );
}
