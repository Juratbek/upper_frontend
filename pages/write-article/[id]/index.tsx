import EditorJS, { OutputBlockData } from '@editorjs/editorjs';
import { Editor } from 'components/Editor';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useLazyGetBlogArticleByIdQuery } from 'store/apis';
import { getArticle, setEditor } from 'store/states';

export default function WriteArticleItemPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const article = useAppSelector(getArticle);
  const [blocks, setBlocks] = useState<OutputBlockData[]>(article?.blocks || []);
  const [fetchArticle] = useLazyGetBlogArticleByIdQuery();
  const id = query?.id;

  const getInstance = (editor: EditorJS): void => {
    editor.isReady
      .then(() => {
        dispatch(setEditor(editor));
      })
      .catch((e) => console.error('err', e));
  };

  useEffect(() => {
    if (blocks.length === 0 && typeof id === 'string') {
      fetchArticle(+id).then(({ data }) => {
        data && setBlocks(data.blocks);
      });
    }
  }, [id]);

  if (!id || (!article && blocks.length === 0)) return <h1>Loading...</h1>;

  return (
    <Editor
      editable={true}
      content={{
        blocks: blocks,
      }}
      handleInstance={getInstance}
    />
  );
}
