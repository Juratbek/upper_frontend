import { Button } from 'components';
import { useUrlParams } from 'hooks';
import { FC, useCallback } from 'react';
import { useAppDispatch } from 'store';
import { useAssignArticleToSectionItemMutation, useCreateArticleMutation } from 'store/apis';
import { assignArticleIdToSectionItem } from 'store/states';

export const CreateArticleButton: FC<{
  tutorialId: number;
  itemId: string;
}> = ({ tutorialId, itemId }) => {
  const [createArticle, createArticleRes] = useCreateArticleMutation();
  const [assignArticle, assignArticleRes] = useAssignArticleToSectionItemMutation();
  const dispatch = useAppDispatch();
  const { setParam } = useUrlParams();

  const createArticleHandler = useCallback(async (): Promise<void> => {
    try {
      // create a new article
      const res = await createArticle({ title: '', blocks: [], labels: [] }).unwrap();
      // send request to assign article to item
      await assignArticle({ tutorialId, itemId, articleId: res.id });
      // update section item
      dispatch(assignArticleIdToSectionItem({ itemId, articleId: res.id }));
      // set article id as a param, it will be used to refetch the article if user refreshes the page
      setParam('articleId', res.id);
    } catch (e) {
      alert(`Xatolik yuz berdi ${e}`);
    }
  }, [tutorialId, itemId, createArticle, assignArticle, dispatch, setParam]);

  if (createArticleRes.isLoading) return <Button className='flex-1'>Maqola yaratilmoqda...</Button>;
  if (assignArticleRes.isLoading)
    return <Button className='flex-1'>Yangi maqola biriktirilmoqda...</Button>;

  return (
    <Button className='flex-1' onClick={createArticleHandler}>
      Yangi maqola yaratish
    </Button>
  );
};
