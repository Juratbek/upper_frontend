import { EditorSpinner } from 'components';
import { Head } from 'components/lib';
import { Editor, IBlockData } from 'components/molecules';
import { createBlock } from 'components/molecules/editor/context/EditorContext.utils';
import { GenericWrapper } from 'components/wrappers';
import { PublishArticleModal, WriteArticleHeader } from 'frontends/user-articles';
import { useBeforeUnload } from 'hooks';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useArticleById, useUpdateArticleBlocks } from 'store/clients/article';
import { addUriToImageBlocks, checkAuthInServer, removeAmazonUriFromImgBlocks } from 'utils';

export default function UserArticlePage(): JSX.Element {
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

  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  const editorChangeHandler = useCallback(
    async (b: IBlockData[]) => {
      const [blocks] = await removeAmazonUriFromImgBlocks(b);
      updateArticle({ id, blocks });
    },
    [updateArticle, article],
  );

  const renderEditor = (): JSX.Element => {
    if (!isIdPresent || !article?.blocks) return <EditorSpinner />;

    return (
      <Editor
        content={{
          blocks:
            article.blocks.length > 0
              ? addUriToImageBlocks(article.blocks)
              : [
                  createBlock('header', {
                    text: '',
                    level: 1,
                    placeholder: 'Maqola sarlavhasini kiriting',
                  }),
                ],
        }}
        onChange={editorChangeHandler}
      />
    );
  };

  return (
    <GenericWrapper sidebar={null} isNavigationHidden header={<WriteArticleHeader />}>
      <div className='editor-container container pb-4' style={{ marginTop: '-3.2rem' }}>
        <PublishArticleModal />
        <Head title='Blog maqolasi' url='/user/articles' />
        {renderEditor()}
      </div>
    </GenericWrapper>
  );
}

export const getServerSideProps = checkAuthInServer;
