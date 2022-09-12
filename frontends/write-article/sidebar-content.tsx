import { Button, Divider, IOption, Select } from 'components';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetLabelsQuery, useSaveArticleMutation } from 'store/apis';
import { getArticle, getEditor, setArticle } from 'store/states';
import { ILabel } from 'types';

export const SidebarContent: FC = () => {
  const [selectedLabels, setSelectedLabels] = useState<IOption[]>([]);
  const { data: labels = [], isSuccess } = useGetLabelsQuery('');
  const [saveArticle, saveArticleStatus] = useSaveArticleMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
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
    router.push(`/user/articles/${newArticle.id}`);
  };

  const labelsChangeHandler = (options: IOption[]): void => {
    setSelectedLabels(options);
  };

  return (
    <>
      <Button onClick={save} className='w-100' loading={saveArticleStatus.isLoading}>
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
