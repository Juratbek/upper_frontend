import { useMemo } from 'react';

import { createEditor } from './editor.service';
import styles from './write-artice.module.scss';

export default function WriteArticlePage(): JSX.Element {
  const Editor = useMemo(async () => {
    return await createEditor();
  }, []);

  const publishHandler = async (): Promise<void> => {
    const editorContent = await (await Editor).save();

    // Do something with editor output
    console.log(editorContent);
  };

  return (
    <>
      <div id='editorjs' className={styles.editorContainer}></div>
      <button typeof={'button'} onClick={publishHandler}>
        Publish your story!
      </button>
    </>
  );
}
