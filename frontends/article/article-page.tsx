import { createEditor } from 'frontends/write-article/editor.service';
import { FC, useEffect, useMemo } from 'react';

import { articleData } from './sample-article';

interface IArticleProps {
  articleId: string;
}

export const Article: FC<IArticleProps> = ({ articleId }) => {
  const Editor = useMemo(async () => {
    return await createEditor({
      data: articleData,
      isReadOnly: true,
      holder: 'editorjs-read',
    });
  }, []);

  // useEffect(() => {
  //   (async (): Promise<void> => {
  //     const editor = await Editor;
  //     await editor.isReady;
  //
  //     console.log(editor.blocks);
  //   })();
  // }, [Editor]);

  return (
    <>
      <div id={'editorjs-read'}></div>
    </>
  );
};
