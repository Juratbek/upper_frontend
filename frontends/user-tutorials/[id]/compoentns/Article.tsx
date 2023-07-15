import EditorJS from '@editorjs/editorjs';
import { ApiErrorBoundary, Editor } from 'components';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useLazyGetBlogArticleByIdQuery, useUpdateArticleMutation } from 'store/apis';
import { TEditorApi } from 'types';
import { addUriToImageBlocks, debouncer } from 'utils';

const debounce = debouncer<TEditorApi>(2500);

export const Article: FC<{ articleId: number }> = ({ articleId }) => {
  const [updateArticle] = useUpdateArticleMutation({
    fixedCacheKey: 'update-article',
  });
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>(null);
  const [fetchArticleById, fetchArticleByIdRes] = useLazyGetBlogArticleByIdQuery();

  const article = useMemo(() => fetchArticleByIdRes.data, [fetchArticleByIdRes.data]);

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
    [updateArticle, article],
  );

  const fetchArticle = useCallback(
    async (id: number) => {
      const res = await fetchArticleById(id);
      // if editor is already rendered render it with new blocks
      const blocks = addUriToImageBlocks(res.data?.blocks || []);
      if (blocks.length === 0) {
        editorInstance?.render?.({ blocks: [{ type: 'paragraph', data: {} }] });
      } else {
        editorInstance?.render?.({ blocks });
      }
    },
    [editorInstance, fetchArticleById],
  );

  useEffect(() => {
    if (!articleId) return;
    fetchArticle(+articleId);
  }, [articleId, fetchArticle]);

  return (
    <ApiErrorBoundary res={fetchArticleByIdRes} fallback='Loading...'>
      <Editor
        autoFocus
        content={{ blocks: addUriToImageBlocks(article?.blocks || []) }}
        changeHandler={editorChangeHandler}
        handleInstance={setEditorInstance}
      />
    </ApiErrorBoundary>
  );
};
