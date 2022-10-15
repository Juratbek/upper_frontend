import { Button, Divider, IOption, ISelectOption, MultiSelect, Select } from 'components';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useCreateArticleMutation,
  useGetAllFieldsQuery,
  useLazyGetAllLabelsByDirectionIdsQuery,
} from 'store/apis';
import { useLazyGetDirectionsByFieldIdQuery } from 'store/apis/direction';
import { getEditor, setArticle } from 'store/states';
import { IDirection, IField, ILabel } from 'types';
import { convertLabelsToOptions, convertOptionsToTags, convertTagsToOptions } from 'utils';

export const SidebarContent: FC = () => {
  const [selectedLabels, setSelectedLabels] = useState<IOption[]>([]);
  const [selectedField, setSelectedField] = useState<IField>();
  const [selectedDirections, setSelectedDirections] = useState<IOption[]>([]);
  const { data: fields } = useGetAllFieldsQuery();
  const [createArticle, createArticleStatus] = useCreateArticleMutation();
  const [fetchDirectionsByFieldId, fetchDirectionsRes] = useLazyGetDirectionsByFieldIdQuery();
  const [fetchLabelsByDirectionIds, fetchLabelsRes] = useLazyGetAllLabelsByDirectionIdsQuery();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const editor = useAppSelector(getEditor);

  const save = async (): Promise<void> => {
    if (!editor) return Promise.reject();

    const editorData = await editor.save();
    const blocks = editorData.blocks;
    const title = blocks.find((block) => block.type === 'header')?.data.text;
    const labels: ILabel[] = selectedLabels.map((l) => ({ name: l.label, id: +l.value }));
    const directions = convertOptionsToTags<IDirection>(selectedDirections);
    const newArticle = await createArticle({
      title,
      blocks,
      labels,
      field: selectedField,
      directions,
    }).unwrap();
    dispatch(setArticle(newArticle));
    router.push(`/user/articles/${newArticle.id}`);
  };

  const labelsChangeHandler = (options: IOption[]): void => {
    setSelectedLabels(options);
  };

  const fieldsChangeHandler = (option: ISelectOption): void => {
    fetchDirectionsByFieldId(+option.value);
    setSelectedField({ id: +option.value, name: option.label });
  };

  const directionsChangeHandler = (options: ISelectOption[]): void => {
    const directionIds = options.map((option) => +option.value);
    fetchLabelsByDirectionIds(directionIds);
    setSelectedDirections(options);
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
        <Select options={convertTagsToOptions(fields)} onChange={fieldsChangeHandler} />
      </div>
      <div>
        <label htmlFor='labels' className='mb-1 d-block'>
          Yo`nalishlar
        </label>
        <MultiSelect
          onChange={directionsChangeHandler}
          options={convertTagsToOptions(fetchDirectionsRes.data)}
        />
      </div>
      <div>
        <label htmlFor='labels' className='mb-1 d-block'>
          Teglar
        </label>
        <MultiSelect
          onChange={labelsChangeHandler}
          options={convertLabelsToOptions(fetchLabelsRes.data)}
        />
      </div>
    </>
  );
};
