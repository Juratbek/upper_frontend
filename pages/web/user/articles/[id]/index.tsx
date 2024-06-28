import { Head, Spinner } from 'components/lib';
import { Editor, IBlockData } from 'components/molecules';
import { createBlock } from 'components/molecules/editor/context/EditorContext.utils';
import { GenericWrapper } from 'components/wrappers';
import { WriteArticleHeader } from 'frontends/user-articles';
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
    if (!isIdPresent || !article?.blocks)
      return (
        <div
          style={{
            height: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Spinner />
          <p>Matn muharriri yuklanmoqda</p>
        </div>
      );

    return (
      <Editor
        classes={{ root: 'mb-5' }}
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
    <GenericWrapper
      areNavigationAndSidebarEqual
      isSidebarHidden
      isNavigationHidden
      header={<WriteArticleHeader />}
    >
      <Head title='Blog maqolasi' url='/user/articles' />
      {renderEditor()}
    </GenericWrapper>
  );
}

export const getServerSideProps = checkAuthInServer;
