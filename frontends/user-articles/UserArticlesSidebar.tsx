import {
  Alert,
  ArticleStatus,
  Button,
  Divider,
  Input,
  IOption,
  Modal,
  MultiSelect,
} from 'components';
import { useModal, useShortCut } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useDeleteArticleMutation,
  useLazySearchLabelsQuery,
  usePublishMutation,
  useUpdateArticleMutaion,
} from 'store/apis';
import { getArticle, getEditor, setArticle, setLabels } from 'store/states';
import { IResponseError } from 'types';
import {
  addUriToImageBlocks,
  convertLabelsToOptions,
  convertOptionsToLabels,
  removeAmazonUriFromImgBlocks,
} from 'utils';
import { ARTICLE_STATUSES } from 'variables';

export const UserArticlesSidebar: FC = () => {
  const [alert, setAlert] = useState<string>();
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { register, handleSubmit } = useForm();
  const article = useAppSelector(getArticle);
  const editor = useAppSelector(getEditor);
  const [isPublishModalOpen, togglePublishModal] = useModal(false);
  const [isDeleteModalOpen, toggleDeleteModal] = useModal(false);

  const [updateArticle, updateArticleRes] = useUpdateArticleMutaion();
  const [publishArticle, publishArticleRes] = usePublishMutation();
  const [deleteArticleReq, deleteArticleRes] = useDeleteArticleMutation();
  const [searchLabels, searchLabelsRes] = useLazySearchLabelsQuery();

  const isSavePressed = useShortCut('s');
  const isPublishPressed = useShortCut('p');

  const isDisabled = useMemo(
    () => updateArticleRes.isLoading || publishArticleRes.isLoading || deleteArticleRes.isLoading,
    [updateArticleRes.isLoading, deleteArticleRes.isLoading, publishArticleRes.isLoading],
  );
  const status = article?.status;

  const saveChanges = async (): Promise<void> => {
    if (!editor || !article) return Promise.reject();

    const editorData = await editor?.save();

    // Don't save image urls in database. Only image IDs
    const [oldBlocks, isReset] = await removeAmazonUriFromImgBlocks(editorData.blocks);
    const title = oldBlocks.find((block) => block.type === 'header')?.data.text;

    const updatedArticle = await updateArticle({ ...article, title, blocks: oldBlocks }).unwrap();
    dispatch(setArticle({ ...article, ...updatedArticle }));
    setAlert('');

    if (isReset) editor.render({ blocks: addUriToImageBlocks(updatedArticle.blocks) });
  };

  const publish = async (): Promise<void> => {
    if (!article) return;
    let res;
    try {
      await saveChanges();
      res = await publishArticle(article.id).unwrap();
    } catch (e) {
      const error = e as IResponseError;
      return setAlert(error.data.message);
    }
    dispatch(setArticle({ ...article, ...res }));
    togglePublishModal();
  };

  const deleteArticle = async (event: Record<string, string>): Promise<void> => {
    if (!article || !editor) return;
    if (event.confirmation !== 'tasdiqlash') return;
    try {
      await deleteArticleReq(article.id);
      push('/articles');
    } catch (e) {}
  };

  const labelsChangeHandler = (options: IOption[]): void => {
    const selectedLabels = convertOptionsToLabels(options);
    dispatch(setLabels(selectedLabels));
  };

  const SearchLabels = (value: string): void => {
    value && searchLabels(value);
  };

  useEffect(() => {
    if (isSavePressed) saveChanges();
    if (isPublishPressed) togglePublishModal();
  }, [isSavePressed, isPublishPressed]);

  const alertComponent = useMemo(
    () =>
      alert && (
        <Alert color='red' onClose={(): void => setAlert('')} className='mb-1'>
          <div>{alert}</div>
          <Link href='/docs'>
            <a target='_blank' className='link'>
              Yo`riqnomani o`qish
            </a>
          </Link>
        </Alert>
      ),
    [alert],
  );

  return (
    <>
      <Modal
        size='small'
        isOpen={isPublishModalOpen}
        close={togglePublishModal}
        bodyClassName='text-center'
      >
        {alertComponent}
        {status === ARTICLE_STATUSES.SAVED && (
          <Alert color='yellow'>Obunalar maqola nashr qilingani haqida habar olishadi</Alert>
        )}
        <h3 className='mt-1'>Maqolani nashr qilmoqchimisiz?</h3>
        <div className='d-flex'>
          <Button color='outline-dark' onClick={togglePublishModal} className='me-1'>
            Modalni yopish
          </Button>
          <Button
            onClick={publish}
            className='flex-1'
            loading={publishArticleRes.isLoading || updateArticleRes.isLoading}
          >
            Nashr qilish
          </Button>
        </div>
      </Modal>
      <Modal
        size='small'
        isOpen={isDeleteModalOpen}
        close={toggleDeleteModal}
        bodyClassName='text-center'
      >
        {alertComponent}
        <form onSubmit={handleSubmit(deleteArticle)}>
          <h3 className='mt-1'>Maqolani o`chirmoqchimisiz</h3>
          <div className='mb-2'>
            <label htmlFor='confirm' className='mb-1 d-block' style={{ userSelect: 'none' }}>
              Tasdiqlash uchun{' '}
              <strong>
                <code>tasdiqlash</code>
              </strong>{' '}
              so`zini kiriting
            </label>
            <Input
              placeholder='tasdiqlash'
              {...register('confirmation', {
                required: true,
                validate: (value) => value === 'tasdiqlash',
              })}
            />
          </div>
          <div className='d-flex justify-content-end'>
            <Button type='button' color='outline-dark' onClick={toggleDeleteModal} className='me-1'>
              Modalni yopish
            </Button>
            <Button color='outline-red' loading={deleteArticleRes.isLoading}>
              O`chirish
            </Button>
          </div>
        </form>
      </Modal>
      {status && (
        <>
          <ArticleStatus className='mb-1' status={status}>
            {article.publishedArticleId && (
              <Link href={`/articles/${article.publishedArticleId}`}>
                <a target={'_blank'}>Nashr varyantini ko&apos;rish</a>
              </Link>
            )}
          </ArticleStatus>
          <div className='d-flex flex-wrap m--1'>
            <Button
              className='flex-auto m-1 mb-0'
              color='outline-red'
              type='button'
              onClick={toggleDeleteModal}
              disabled={isDisabled}
            >
              O`chirish
            </Button>
            <Button
              className='flex-auto m-1 mb-0'
              color='outline-dark'
              type='button'
              onClick={saveChanges}
              loading={updateArticleRes.isLoading}
              disabled={publishArticleRes.isLoading}
            >
              Saqlash
            </Button>
            {status === ARTICLE_STATUSES.SAVED && (
              <Button
                className='flex-auto m-1 mb-0'
                type='button'
                onClick={togglePublishModal}
                disabled={isDisabled}
              >
                Nashr qilish
              </Button>
            )}
            {article.hasNotpublishedChanges && (
              <Button
                className='flex-auto m-1 mb-0'
                onClick={togglePublishModal}
                disabled={isDisabled}
              >
                Nashr qilish
              </Button>
            )}
          </div>
        </>
      )}
      <Divider className='my-2' />
      <h2>Sozlamalar</h2>
      {article && (
        <div className='mb-1'>
          <div className='d-flex justify-content-between'>
            <label htmlFor='labels' className='mb-1 d-block'>
              Teglar
            </label>
            <Link href='/create-label'>
              <a target='_blank' className='link text-gray'>
                Tag yaratish
              </a>
            </Link>
          </div>
          <MultiSelect
            onChange={labelsChangeHandler}
            onInputDebounce={SearchLabels}
            defaultValues={convertLabelsToOptions(article.labels)}
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
      )}
    </>
  );
};
