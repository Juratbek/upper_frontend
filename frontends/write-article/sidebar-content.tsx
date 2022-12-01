import { Alert, Button, Divider, IOption, MultiSelect } from 'components';
import { useShortCut } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useCreateArticleMutation, useLazySearchLabelsQuery } from 'store/apis';
import { getEditor, setArticle } from 'store/states';
import { ILabel, IResponseError } from 'types';
import { compressUnsplashImage, convertLabelsToOptions } from 'utils';
import { MAX_LABELS } from 'variables';

export const SidebarContent: FC = () => {
  const [selectedLabels, setSelectedLabels] = useState<IOption[]>([]);
  const [createArticle, createArticleRes] = useCreateArticleMutation();
  const [searchLabels, searchLabelsRes] = useLazySearchLabelsQuery();
  const [alert, setAlert] = useState<string>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const editor = useAppSelector(getEditor);
  const isSavePressed = useShortCut('s');

  const save = async (): Promise<void> => {
    if (!editor) return Promise.reject();

    const editorData = await editor.save();
    const blocks = editorData.blocks.map(compressUnsplashImage);
    const title = blocks.find((block) => block.type === 'header')?.data.text;
    const labels: ILabel[] = selectedLabels.map((l) => ({ name: l.label, id: +l.value }));

    createArticle({ title, blocks, labels });
  };

  const labelsChangeHandler = (options: IOption[]): void => {
    setSelectedLabels(options);
  };

  const SearchLabels = (value: string): void => {
    value && searchLabels(value);
  };

  const closeAlert = (): void => setAlert('');

  useEffect(() => {
    if (isSavePressed) save();
  }, [isSavePressed]);

  useEffect(() => {
    const { isError, error, isSuccess, data: newArticle } = createArticleRes;
    if (isError) {
      const exception = error as IResponseError;
      exception.status === 400
        ? setAlert('Maqolani saqlashda hatolik yuz berdi')
        : setAlert(exception.data.message);
    }
    if (isSuccess) {
      dispatch(setArticle(newArticle));
      router.push(`/user/articles/${newArticle.id}`);
    }
  }, [createArticleRes.status]);

  return (
    <>
      {alert && (
        <Alert onClose={closeAlert} color='red' className='mb-1'>
          {alert}
        </Alert>
      )}
      <Button onClick={save} className='w-100' loading={createArticleRes.isLoading}>
        Saqlash
      </Button>
      <Divider className='my-2' />
      <h2>Sozlamalar</h2>
      <div>
        <div className='d-flex justify-content-between'>
          <label htmlFor='labels' className='mb-1 d-block'>
            Teglar
          </label>
          <Link href='/create-label'>
            <a target='_blank' className='text-gray link'>
              Teg yaratish
            </a>
          </Link>
        </div>
        <MultiSelect
          max={MAX_LABELS}
          onChange={labelsChangeHandler}
          onInputDebounce={SearchLabels}
          renderItem={(item): JSX.Element => {
            return (
              <div className='p-1 pointer'>
                <h4 className='m-0'>{item.label}</h4>
                <p className='m-0 mt-1 fs-1'>{item.description}</p>
              </div>
            );
          }}
          options={convertLabelsToOptions(searchLabelsRes.data)}
          inputPlacegolder='Qidirish uchun yozing'
        />
      </div>
    </>
  );
};
