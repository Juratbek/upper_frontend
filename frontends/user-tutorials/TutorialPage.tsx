import { Button, Editor } from 'components';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useMemo } from 'react';
import {
  useAssignArticleToSectionItemMutation,
  useCreateArticleMutation,
  useLazyGetBlogArticleByIdQuery,
  useUpdateArticleMutation,
} from 'store/apis';
import { TEditorApi } from 'types';
import { debouncer } from 'utils';

const debounce = debouncer<TEditorApi>(4000);

export const TutorialPage: FC = () => {
  const [createArticle, createArticleRes] = useCreateArticleMutation();
  const [assignArticle, assignArticleRes] = useAssignArticleToSectionItemMutation();
  const [fetchArticleById, fetchArticleByIdRes] = useLazyGetBlogArticleByIdQuery();
  const [updateArticle] = useUpdateArticleMutation();
  const {
    query: { itemId, id, articleId },
  } = useRouter();
  const article = fetchArticleByIdRes.data;

  const createArticleHandler = async (): Promise<void> => {
    if (!id || typeof itemId !== 'string') return Promise.reject();

    try {
      const res = await createArticle({ title: '', blocks: [], labels: [] }).unwrap();
      assignArticle({ tutorialId: +id, itemId: itemId, articleId: res.id });
    } catch (e) {
      alert(`Xatolik yuz berdi ${e}`);
    }
  };

  const editorChangeHandler = useCallback(
    async (api: TEditorApi) => {
      if (!article) return;

      debounce(api, () => {
        api.saver.save().then(({ blocks }) => {
          const title = blocks.find((block) => block.type === 'header')?.data.text;
          updateArticle({ ...article, blocks, title });
        });
      });
    },
    [article],
  );

  useEffect(() => {
    articleId && fetchArticleById(+articleId);
  }, [articleId]);

  // render a button to create and assign a new article
  const createArticleButton = useMemo(() => {
    if (createArticleRes.isLoading) return <Button>Maqola yaratilmoqda...</Button>;
    if (assignArticleRes.isLoading) return <Button>Yangi maqola biriktirilmoqda...</Button>;

    return <Button onClick={createArticleHandler}>Yangi maqola yaratish</Button>;
  }, [createArticleRes, assignArticleRes]);

  // render an editor
  const editor = useMemo(() => {
    if (fetchArticleByIdRes.isSuccess) {
      return (
        <Editor
          content={{ blocks: fetchArticleByIdRes.data?.blocks }}
          changeHandler={editorChangeHandler}
        />
      );
    }
    if (createArticleRes.isSuccess) {
      return <Editor content={{ blocks: createArticleRes.data?.blocks }} />;
    }
    return null;
  }, [createArticleRes, fetchArticleByIdRes, editorChangeHandler]);

  const content = useMemo(() => {
    if (editor) return editor;
  }, [editor]);

  return <div className='container'>{content}</div>;
};
