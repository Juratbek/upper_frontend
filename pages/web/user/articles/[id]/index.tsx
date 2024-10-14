import { Head, Spinner } from 'components/lib';
import { createBlock, Editor, IBlockData, IEditor } from 'components/organisms';
import { GenericWrapper } from 'components/wrappers';
import { WriteArticleHeader } from 'frontends/user-articles';
import { useBeforeUnload } from 'hooks';
import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';
import { useArticleById, useUpdateArticleBlocks, useUploadImage } from 'store/clients/article';
import {
  addBucketUrl,
  addBucketUrlToBlocks,
  checkAuthInServer,
  debouncer,
  removeAmazonUriFromImgBlocks,
} from 'utils';

const debounce = debouncer<{ id: number; blocks: IBlockData[] }>();

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
  const editorRef = useRef<IEditor | null>(null);
  const { mutate: updateArticle, isPending: isBeingSaved } = useUpdateArticleBlocks(id, {
    enabled: isIdPresent,
  });
  const { mutateAsync: uploadImage } = useUploadImage(id);

  useBeforeUnload();

  const uploadImageHandler = useCallback(
    async (file: File) => {
      const { url } = await uploadImage(file);
      return { url: addBucketUrl(url) };
    },
    [uploadImage],
  );

  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  const editorChangeHandler = useCallback(
    async (b: IBlockData[]) => {
      if (isBeingSaved) {
        return;
      } else {
        const [blocks] = await removeAmazonUriFromImgBlocks(b);
        debounce({ id, blocks }, (article) => {
          updateArticle(article);
        });
      }
    },
    [updateArticle, article, isBeingSaved],
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
              ? addBucketUrlToBlocks(article.blocks)
              : [
                  createBlock('header', {
                    text: '',
                    level: 1,
                    placeholder: 'Maqola sarlavhasini kiriting',
                  }),
                ],
        }}
        onReady={(editor) => (editorRef.current = editor)}
        onChange={editorChangeHandler}
        upload={uploadImageHandler}
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
