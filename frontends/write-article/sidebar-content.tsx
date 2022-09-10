import { Button, Divider, IOption, Select } from 'components';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetLabelsQuery, useSaveArticleMutation, useUpdateArticleStatus } from 'store/apis';
import { getArticle, getEditor, setArticle } from 'store/states';
import { ILabel } from 'types';
import { ARTICLE_STATUSES } from 'variables';

export const SidebarContent: FC = () => {
  const [selectedLabels, setSelectedLabels] = useState<IOption[]>([]);
  const { data: labels = [], isSuccess } = useGetLabelsQuery('');
  const [saveArticle] = useSaveArticleMutation();
  const [updateArticleStatus] = useUpdateArticleStatus();
  const dispatch = useAppDispatch();
  const editor = useAppSelector(getEditor);
  const article = useAppSelector(getArticle);

  const save = async (): Promise<void> => {
    if (!editor) return Promise.reject();

    const editorData = await editor.save();
    const blocks = editorData.blocks;
    const title = blocks.find((block) => block.type === 'header')?.data.text;
    const labels: ILabel[] = selectedLabels.map((l) => ({ name: l.label, id: +l.value }));
    const newArticle = await saveArticle({ id: article?.id, title, blocks, labels }).unwrap();
    dispatch(setArticle(newArticle));
  };

  const publish = async (): Promise<void> => {
    if (article) {
      await updateArticleStatus({ id: article.id, status: ARTICLE_STATUSES.PUBLISHED });
    }
  };

  const labelsChangeHandler = (options: IOption[]): void => {
    setSelectedLabels(options);
  };

  return (
    <>
      {article && (
        <Button className='w-100 mb-1' onClick={publish}>
          Chop Etish
        </Button>
      )}
      <Button onClick={save} className='w-100'>
        Saqlash
      </Button>

      <Divider className='my-2' />
      <h2>Sozlamalar</h2>
      <label htmlFor='labels' className='mb-1 d-block'>
        Teglar
      </label>
      {isSuccess && (
        <Select
          onChange={labelsChangeHandler}
          options={labels.map((label) => ({ label: label.name, value: label.id }))}
        />
      )}
    </>
  );
};
