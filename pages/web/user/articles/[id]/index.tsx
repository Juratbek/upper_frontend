import EditorJS, { OutputBlockData } from '@editorjs/editorjs';
import { Alert, EditorSpinner, Head } from 'components';
import { Editor, TEditorApi } from 'components/Editor';
import { GenericWrapper } from 'components/wrappers';
import { useBeforeUnload } from 'hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useLazyGetBlogArticleByIdQuery, useUpdateArticleBlocksMutation } from 'store/apis';
import { getArticle, setArticle, setEditor } from 'store/states';
import {
  addUriToImageBlocks,
  checkAuthInServer,
  debouncer,
  get,
  removeAmazonUriFromImgBlocks,
} from 'utils';

const debounce = debouncer<TEditorApi>(2500);
export default function UserArticlePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [updateArticle] = useUpdateArticleBlocksMutation({
    fixedCacheKey: 'update-article',
  });
  const { query } = useRouter();
  const article = useAppSelector(getArticle);
  const [blocks, setBlocks] = useState<OutputBlockData[] | null>(article?.blocks || null);
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
    if (!blocks && typeof id === 'string') {
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
    setHasAlert(Boolean(hasNotPublishedChanges));
  }, [article?.hasNotpublishedChanges]);

  const closeAlert = (): void => {
    setHasAlert(false);
  };

  if (isError) return <h1>{JSON.stringify(get(error, 'data.message'))}</h1>;

  const editorChangeHandler = useCallback(
    async (api: TEditorApi) => {
      if (!article) return;
      debounce(api, async () => {
        const editorData = await api.saver.save();
        const [blocks] = await removeAmazonUriFromImgBlocks(editorData.blocks);
        updateArticle({ ...article, blocks });
      });
    },
    [updateArticle, article],
  );

  const renderEditor = (): JSX.Element => {
    if (!id || !article || !blocks) return <EditorSpinner />;

    return (
      <Editor
        content={{
          blocks: blocks,
        }}
        handleInstance={getInstance}
        autoFocus
        changeHandler={editorChangeHandler}
      />
    );
  };

  return (
    <GenericWrapper sidebar={null} navigation={null}>
      <div className='editor-container container pb-4'>
        <Head title='Blog maqolasi' url='/user/articles' />
        {hasAlert && (
          <Alert className='mt-2' onClose={closeAlert}>
            Saqlangan lekin nashr etilmagan o&apos;zgarishlar mavjud. Ularni nashr qilish uchun
            &quot;Nashr qilish&quot; tugmasini bosing
          </Alert>
        )}
        {renderEditor()}
      </div>
    </GenericWrapper>
  );
}

export const getServerSideProps = checkAuthInServer;
