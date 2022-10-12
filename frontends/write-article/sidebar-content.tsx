import { Button, Divider, IOption, MultiSelect, Select } from 'components';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useCreateArticleMutation, useGetLabelsQuery } from 'store/apis';
import { getEditor, setArticle } from 'store/states';
import { ILabel } from 'types';

export const SidebarContent: FC = () => {
  const [selectedLabels, setSelectedLabels] = useState<IOption[]>([]);
  const { data: labels = [], isSuccess } = useGetLabelsQuery();
  const [createArticle, createArticleStatus] = useCreateArticleMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const editor = useAppSelector(getEditor);

  const save = async (): Promise<void> => {
    if (!editor) return Promise.reject();

    const editorData = await editor.save();
    const blocks = editorData.blocks;
    const title = blocks.find((block) => block.type === 'header')?.data.text;
    const labels: ILabel[] = selectedLabels.map((l) => ({ name: l.label, id: +l.value }));
    const newArticle = await createArticle({ title, blocks, labels }).unwrap();
    dispatch(setArticle(newArticle));
    router.push(`/user/articles/${newArticle.id}`);
  };

  const labelsChangeHandler = (options: IOption[]): void => {
    setSelectedLabels(options);
  };

  return (
    <>
      <Button onClick={save} className='w-100' loading={createArticleStatus.isLoading}>
        Saqlash
      </Button>
      <Divider className='my-2' />
      <h2>Sozlamalar</h2>
      <div className='mb-1'>
        <label htmlFor='labels' className='mb-1 d-block'>
          Sohalar
        </label>
        <Select
          options={[
            { value: 1, label: 'IT' },
            { value: 2, label: 'Sog`liq' },
            { value: 3, label: "Ta'lim" },
          ]}
        />
      </div>
      <div>
        <label htmlFor='labels' className='mb-1 d-block'>
          Teglar
        </label>
        {isSuccess && (
          <MultiSelect
            onChange={labelsChangeHandler}
            options={labels.map((label) => ({ label: label.name, value: label.id }))}
          />
        )}
      </div>
    </>
  );
};
