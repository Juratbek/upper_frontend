import {
  Alert,
  ArticleStatus,
  Button,
  Divider,
  Error,
  Input,
  IOption,
  Modal,
  MultiSelect,
} from 'components';
import { DELETE_CONFIRMATION } from 'frontends/articles';
import { useModal, useShortCut } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useDeleteArticleMutation,
  useLazySearchLabelsQuery,
  usePublishMutation,
  useUpdateArticleMutation,
} from 'store/apis';
import { getArticle, getEditor, setArticle, setLabels } from 'store/states';
import { IResponseError } from 'types';
import {
  addUriToImageBlocks,
  convertLabelsToOptions,
  convertOptionsToLabels,
  removeAmazonUriFromImgBlocks,
  validateArticle,
} from 'utils';
import { ARTICLE_STATUSES, MAX_LABELS, WEB_APP_ROOT_DIR } from 'variables';

export const UserArticlesSidebar: FC = () => {
  const [alert, setAlert] = useState<string>();
  const [isNotificationOn, setIsNotificationOn] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const article = useAppSelector(getArticle);
  const editor = useAppSelector(getEditor);
  const [isPublishModalOpen, togglePublishModal, { close: closePublishModal }] = useModal(false);
  const [isDeleteModalOpen, toggleDeleteModal, { close: closeDeleteModal }] = useModal(false);

  const [updateArticle, updateArticleRes] = useUpdateArticleMutation();
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
    if (!article || !editor) return;
    // validating article for publishing
    const editorData = await editor.save();
    const validationResult = validateArticle({ ...article, blocks: editorData.blocks });
    if (!validationResult.isValid) {
      return setAlert(validationResult.message);
    }

    let res;
    try {
      await saveChanges();
      res = await publishArticle({ id: article.id, notificationsOn: isNotificationOn }).unwrap();
    } catch (e) {
      const error = e as IResponseError;
      return setAlert(error.data.message);
    }
    dispatch(setArticle({ ...article, ...res }));
    togglePublishModal();
  };

  const notificationRadioInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target?.value;
    if (value === 'false') setIsNotificationOn(false);
    if (value === 'true') setIsNotificationOn(true);
  };

  const deleteArticle = async (event: Record<string, string>): Promise<void> => {
    if (!article || !editor) return;
    if (event.confirmation !== DELETE_CONFIRMATION) return;
    try {
      await deleteArticleReq(article.id).unwrap();
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

  const alertComponent = useMemo(() => {
    if (!alert) return <></>;
    return (
      <Alert color='red' onClose={(): void => setAlert('')} className='mb-1'>
        <div>{alert}</div>
        <Link href={`${WEB_APP_ROOT_DIR}/docs/write-article_publish_requirements`}>
          <a target='_blank' className='link text-underline'>
            Yo&apos;riqnomani o&apos;qish
          </a>
        </Link>
      </Alert>
    );
  }, [alert]);

  const closePublishModalHandler = (): void => {
    closePublishModal();
    setAlert('');
  };

  return (
    <>
      <Modal
        size='small'
        isOpen={isPublishModalOpen}
        close={closePublishModalHandler}
        bodyClassName='text-center'
      >
        {alertComponent}
        <h3 className='my-1'>Maqolani nashr qilmoqchimisiz?</h3>
        {status === ARTICLE_STATUSES.SAVED && (
          <div className='form-element'>
            <p>Obunachilar maqola nashr qilingani haqida habar olishlarini hohlaysizmi?</p>
            <div className='d-flex justify-content-center'>
              <div className='d-flex me-2'>
                <Input
                  type='radio'
                  name='notificationOn'
                  value='true'
                  defaultChecked
                  onChange={notificationRadioInputChangeHandler}
                />
                <label className='ms-1'>Ha, albatta</label>
              </div>
              <div className='d-flex'>
                <Input
                  type='radio'
                  name='notificationOn'
                  value='false'
                  onChange={notificationRadioInputChangeHandler}
                />
                <label className='ms-1'>Yo&apos;q</label>
              </div>
            </div>
          </div>
        )}
        <div className='d-flex'>
          <Button color='outline-dark' onClick={closePublishModalHandler} className='me-1'>
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
        close={closeDeleteModal}
        bodyClassName='text-center'
      >
        {alertComponent}
        <form onSubmit={handleSubmit(deleteArticle)}>
          <h3 className='mt-1'>Maqolani o&apos;chirmoqchimisiz</h3>
          <div className='mb-2'>
            <label htmlFor='confirm' className='mb-1 d-block' style={{ userSelect: 'none' }}>
              Tasdiqlash uchun{' '}
              <strong>
                <code>{DELETE_CONFIRMATION}</code>
              </strong>{' '}
              so&apos;zini kiriting
            </label>
            <Input
              placeholder={DELETE_CONFIRMATION}
              {...register('confirmation', {
                required: true,
                validate: (value) => value === DELETE_CONFIRMATION || `Noto'g'ri so'z kiritildi.`,
              })}
            />
            {errors['confirmation']?.type === 'validate' && (
              <Error error={errors['confirmation']} />
            )}
          </div>
          <div className='d-flex justify-content-end'>
            <Button type='button' color='outline-dark' onClick={toggleDeleteModal} className='me-1'>
              Modalni yopish
            </Button>
            <Button color='outline-red' loading={deleteArticleRes.isLoading}>
              O&apos;chirish
            </Button>
          </div>
        </form>
      </Modal>
      {status && (
        <>
          <ArticleStatus className='mb-1' status={status}>
            {article.publishedArticleId && (
              <Link href={`${WEB_APP_ROOT_DIR}/articles/${article.publishedArticleId}`}>
                <a target={'_blank'}>Nashr varyantini ko&apos;rish</a>
              </Link>
            )}
          </ArticleStatus>
          <div className='d-flex flex-wrap m--1'>
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
            <Link href={`${WEB_APP_ROOT_DIR}/create-label`}>
              <a target='_blank' className='text-gray link'>
                Teg yaratish
              </a>
            </Link>
          </div>
          <MultiSelect
            max={MAX_LABELS}
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
            loading={searchLabelsRes.isLoading}
            options={convertLabelsToOptions(searchLabelsRes.data)}
            inputPlacegolder='Qidirish uchun yozing'
          />
        </div>
      )}
    </>
  );
};
