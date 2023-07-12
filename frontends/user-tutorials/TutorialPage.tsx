import EditorJS from '@editorjs/editorjs';
import { Button, Editor, ISelectOption, Select, StorysetImage } from 'components';
import { useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useAssignArticleToSectionItemMutation,
  useCreateArticleMutation,
  useLazyGetBlogArticleByIdQuery,
  useLazySearchArticleQuery,
  useUpdateArticleMutation,
} from 'store/apis';
import { assignArticleIdToSectionItem } from 'store/states';
import { TEditorApi } from 'types';
import { addUriToImageBlocks, convertToOptions, debouncer } from 'utils';

import classes from './TutorialPage.module.scss';

const debounce = debouncer<TEditorApi>(4000);

export const TutorialPage: FC = () => {
  const [createArticle, createArticleRes] = useCreateArticleMutation();
  const [assignArticle, assignArticleRes] = useAssignArticleToSectionItemMutation();
  const [fetchArticleById, fetchArticleByIdRes] = useLazyGetBlogArticleByIdQuery();
  const [updateArticle] = useUpdateArticleMutation();
  const [editorInstance, setEditorInstance] = useState<EditorJS | null>(null);
  const [searchArticle, searchArticleRes] = useLazySearchArticleQuery();
  const [isArticleSelectVisible, setIsArticleSelectVisible] = useState(false);
  const {
    query: { itemId, id, articleId },
  } = useRouter();
  const { setParam } = useUrlParams();
  const dispatch = useDispatch();
  const article = fetchArticleByIdRes.data;

  const createArticleHandler = useCallback(async (): Promise<void> => {
    if (!id || typeof itemId !== 'string') return Promise.reject();

    try {
      const res = await createArticle({ title: '', blocks: [], labels: [] }).unwrap();
      assignArticle({ tutorialId: +id, itemId: itemId, articleId: res.id });
    } catch (e) {
      alert(`Xatolik yuz berdi ${e}`);
    }
  }, [id, itemId]);

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

  const openArticleSelect = useCallback(() => setIsArticleSelectVisible(true), []);

  const articleSelectChangeHandler = useCallback(
    (value: string) => searchArticle({ search: value }),
    [],
  );

  const selectArticleHandler = useCallback(
    async (option: ISelectOption) => {
      if (!id || typeof itemId !== 'string') return;
      const articleId = +option.value;
      // close article select
      setIsArticleSelectVisible(false);
      // send request to assign article to item
      await assignArticle({ tutorialId: +id, itemId, articleId: articleId });
      // update section item
      dispatch(assignArticleIdToSectionItem({ itemId, articleId: articleId }));
      // set article id as a param, it will be used to refetch the article if user refreshes the page
      setParam('articleId', articleId);
    },
    [itemId, id],
  );

  useEffect(() => {
    articleId &&
      fetchArticleById(+articleId).then((res) => {
        // if editor is already rendered render it with new blocks
        if (editorInstance) {
          editorInstance.render({ blocks: addUriToImageBlocks(res.data?.blocks || []) });
        }
      });
  }, [articleId]);

  // render a button to create and assign a new article
  const createArticleButton = useMemo(() => {
    if (createArticleRes.isLoading)
      return <Button className='flex-1'>Maqola yaratilmoqda...</Button>;
    if (assignArticleRes.isLoading)
      return <Button className='flex-1'>Yangi maqola biriktirilmoqda...</Button>;

    return (
      <Button className='flex-1' onClick={createArticleHandler}>
        Yangi maqola yaratish
      </Button>
    );
  }, [createArticleRes, assignArticleRes, createArticleHandler]);

  const articleSelect = useMemo(() => {
    return (
      <div className='mt-2'>
        <Select
          searcheable
          options={convertToOptions(searchArticleRes.data, 'id', 'title') || []}
          onInputDebounce={articleSelectChangeHandler}
          onChange={selectArticleHandler}
          placeholder='Maqolangizni qidirish uchun yozing'
        />
      </div>
    );
  }, [articleSelectChangeHandler, searchArticleRes, selectArticleHandler]);

  const assignArticleUI = useMemo(() => {
    return (
      <div className={classes['assign-article-ui']}>
        <div className='mb-2 text-center'>
          <StorysetImage
            width={300}
            height={300}
            src='/storyset/write_article.svg'
            storysetUri='creativity'
          />
        </div>
        <h4 className='text-center'>
          Yangi maqola yarating yoki mavjud maqolalaringizdan birini tanlang
        </h4>
        <div className='d-flex f-gap-1 px-2'>
          {createArticleButton}
          <Button className='flex-1' onClick={openArticleSelect}>
            Maqola biriktirish
          </Button>
        </div>
        {isArticleSelectVisible && articleSelect}
      </div>
    );
  }, [createArticleButton, isArticleSelectVisible, articleSelect, openArticleSelect]);

  // render an editor
  const editor = useMemo(() => {
    // if section item has an assigned article return an editor
    if (article && articleId) {
      return (
        <Editor
          content={{ blocks: addUriToImageBlocks(article.blocks) }}
          changeHandler={editorChangeHandler}
          handleInstance={setEditorInstance}
        />
      );
    }
    // if section item is not assigned show assign an article UI
    if (!articleId) return assignArticleUI;
    return null;
  }, [article, editorChangeHandler, articleId, assignArticleUI]);

  const content = useMemo(() => {
    if (editor) return editor;
  }, [editor]);

  return <div className='container'>{content}</div>;
};
