import EditorJS, { OutputBlockData } from '@editorjs/editorjs';
import { Alert, EditorSpinner } from 'components';
import { Editor } from 'components/Editor';
import { useBeforeUnload } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useLazyGetBlogArticleByIdQuery } from 'store/apis';
import { getArticle, setArticle, setEditor } from 'store/states';
import { addUriToImageBlocks, checkAuthInServer, get } from 'utils';

export default function UserArticlePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const article = useAppSelector(getArticle);
  const [blocks, setBlocks] = useState<OutputBlockData[]>(article?.blocks || []);
  const [hasAlert, setHasAlert] = useState<boolean>();
  const [fetchArticle, { isError, error }] = useLazyGetBlogArticleByIdQuery();
  const id = query?.id;

  useBeforeUnload();

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
        if (data) {
          const generatedBlocks = addUriToImageBlocks(data.blocks);
          setBlocks(generatedBlocks);
          dispatch(setArticle(data));
        }
      });
    }
    return () => {
      dispatch(setArticle(null));
    };
  }, [id]);

  useEffect(() => {
    const hasNotPublishedChanges = article?.hasNotpublishedChanges;
    if (hasNotPublishedChanges) {
      setHasAlert(hasNotPublishedChanges);
    }
  }, [article?.hasNotpublishedChanges]);

  const closeAlert = (): void => {
    setHasAlert(false);
  };

  if (isError) return <h1>{JSON.stringify(get(error, 'data.message'))}</h1>;

  const renderEditor = (): JSX.Element => {
    if (!id || !article || blocks.length === 0) return <EditorSpinner />;

    return (
      <Editor
        content={{
          blocks: blocks,
        }}
        handleInstance={getInstance}
      />
    );
  };

  return (
    <div className='editor-container container pb-4'>
      {hasAlert && (
        <Alert className='mt-2' onClose={closeAlert}>
          Saqlangan lekin nashr etilmagan o`zgarishlar mavjud. Ularni nashr qilish uchun &quot;Nashr
          qilish&quot; tugmasini bosing
        </Alert>
      )}
      {renderEditor()}
    </div>
  );
}

export const getServerSideProps = checkAuthInServer;
