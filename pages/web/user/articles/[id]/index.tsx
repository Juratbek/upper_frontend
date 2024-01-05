import EditorJS from '@editorjs/editorjs';
import { EditorSpinner } from 'components';
import { Editor, TEditorApi } from 'components/Editor';
import { Head } from 'components/lib';
import { GenericWrapper } from 'components/wrappers';
import { useBeforeUnload } from 'hooks';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useAppDispatch } from 'store';
import { useArticleById, useUpdateArticleBlocks } from 'store/clients/article';
import { setEditor } from 'store/states';
import { checkAuthInServer, debouncer, removeAmazonUriFromImgBlocks } from 'utils';

const debounce = debouncer<TEditorApi>(2000);

export default function UserArticlePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const id = +(query?.id as string);
  const isIdPresent = !isNaN(id);
  const {
    data: article,
    isError,
    error,
  } = useArticleById(id, {
    enabled: isIdPresent,
  });
  const { mutate: updateArticle } = useUpdateArticleBlocks(id, { enabled: isIdPresent });

  useBeforeUnload();

  const getInstance = (editor: EditorJS): void => {
    editor.isReady
      .then(() => {
        dispatch(setEditor(editor));
      })
      .catch((e) => console.error('err', e));
  };

  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  const editorChangeHandler = useCallback(
    async (api: TEditorApi) => {
      debounce(api, async () => {
        const editorData = await api.saver.save();
        const [blocks] = await removeAmazonUriFromImgBlocks(editorData.blocks);
        updateArticle({ id, blocks });
      });
    },
    [updateArticle, article],
  );

  const renderEditor = (): JSX.Element => {
    if (!isIdPresent || !article?.blocks) return <EditorSpinner />;

    return (
      <Editor
        content={{
          blocks: article.blocks,
        }}
        handleInstance={getInstance}
        autoFocus
        changeHandler={editorChangeHandler}
      />
    );
  };

  return (
    <GenericWrapper sidebar={null} desktopNavigation={null}>
      <div className='editor-container container pb-4'>
        <Head title='Blog maqolasi' url='/user/articles' />
        {renderEditor()}
      </div>
    </GenericWrapper>
  );
}

export const getServerSideProps = checkAuthInServer;
