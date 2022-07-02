import { useMemo } from 'react';

import { createEditor } from './editor.service';

export default function WriteArticlePage(): JSX.Element {
  const Editor = useMemo(async () => {
    return await createEditor();
  }, []);

  return <div id='editorjs'></div>;
}
