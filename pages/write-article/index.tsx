import { createEditor } from 'frontends/write-article';
import { useMemo } from 'react';

import styles from './write-artice.module.scss';

export default function WriteArticlePage(): JSX.Element {
  const Editor = useMemo(async () => {
    return await createEditor();
  }, []);

  return (
    <>
      <div id='editorjs' className={styles.editorContainer}></div>
    </>
  );
}
