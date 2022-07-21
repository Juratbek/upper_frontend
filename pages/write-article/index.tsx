import EditorJs from '@editorjs/editorjs';
import { createEditor } from 'frontends/write-article';
import { EDITOR_HOLDER } from 'frontends/write-article';
import { useEffect, useState } from 'react';

import styles from './write-artice.module.scss';

export default function WriteArticlePage(): JSX.Element {
  const [, setEditor] = useState<EditorJs | null>(null);

  useEffect(() => {
    createEditor().then((editor) => setEditor(editor));
  }, []);

  return (
    <>
      <div id={EDITOR_HOLDER} className={styles.editorContainer}></div>
    </>
  );
}
