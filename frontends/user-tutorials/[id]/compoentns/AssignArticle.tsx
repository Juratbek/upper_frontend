import { Button, ISelectOption, Select, StorysetImage } from 'components';
import { useUrlParams } from 'hooks';
import { FC, useCallback, useState } from 'react';
import { useAppDispatch } from 'store';
import { useAssignArticleToSectionItemMutation, useLazySearchArticleQuery } from 'store/apis';
import { assignArticleIdToSectionItem } from 'store/states';
import { convertToOptions } from 'utils';

import classes from '../TutorialPage.module.scss';
import { CreateArticleButton } from './CreateArticleButton';

export const AssignArticle: FC<{ tutorialId: number; itemId: string }> = ({
  tutorialId,
  itemId,
}) => {
  const [assignArticle] = useAssignArticleToSectionItemMutation();
  const [isArticleSelectVisible, setIsArticleSelectVisible] = useState(false);
  const [searchArticle, searchArticleRes] = useLazySearchArticleQuery();
  const { setParam } = useUrlParams();
  const dispatch = useAppDispatch();

  const handleAssignArticle = useCallback(
    async (articleId: number) => {
      if (!tutorialId || typeof itemId !== 'string') return Promise.reject();
      // send request to assign article to item
      await assignArticle({ tutorialId, itemId, articleId });
      // update section item
      dispatch(assignArticleIdToSectionItem({ itemId, articleId }));
      // set article id as a param, it will be used to refetch the article if user refreshes the page
      setParam('articleId', articleId);
    },
    [itemId, tutorialId, assignArticle, dispatch, setParam],
  );

  const openArticleSelect = useCallback(() => setIsArticleSelectVisible(true), []);

  const articleSelectChangeHandler = useCallback(
    (value: string) => searchArticle({ search: value }),
    [searchArticle],
  );

  const selectArticleHandler = useCallback(
    async (option: ISelectOption) => {
      if (!tutorialId || typeof itemId !== 'string') return;
      const articleId = +option.value;
      // close article select
      setIsArticleSelectVisible(false);
      // assign article id to section item
      handleAssignArticle(articleId);
    },
    [itemId, tutorialId, handleAssignArticle],
  );

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
        <CreateArticleButton itemId={itemId} tutorialId={tutorialId} />
        <Button className='flex-1' onClick={openArticleSelect}>
          Maqola biriktirish
        </Button>
      </div>
      {isArticleSelectVisible && (
        <div className='mt-2'>
          <Select
            searcheable
            options={convertToOptions(searchArticleRes.data, 'id', 'title') || []}
            onInputDebounce={articleSelectChangeHandler}
            onChange={selectArticleHandler}
            placeholder='Maqolangizni qidirish uchun yozing'
          />
        </div>
      )}
    </div>
  );
};
