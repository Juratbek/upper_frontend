import { ArticleStatus, Button, Divider, Dropdown, Tooltip } from 'components';
import { useModal, useShortCut, useTheme } from 'hooks';
import Link from 'next/link';
import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useUpdateArticleBlocksMutation, useUpdateArticleLabelsMutation } from 'store/apis';
import { getArticle, getEditor, setArticle, setLabels } from 'store/states';
import { addUriToImageBlocks, removeAmazonUriFromImgBlocks } from 'utils';
import { ARTICLE_STATUSES, ICONS, MAX_LABELS, WEB_APP_ROOT_DIR } from 'variables';

import { ConnectTelegram } from './components/ConnectTelegram';
import { DeleteArticleModal } from './components/DeleteArticleModal';
import { LabelSelector } from './components/label-selector';
import { PublishArticleModal } from './components/PublishArticleModal';

export const UserArticlesSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const { themeColors, theme } = useTheme();
  const [updateArticle, updateArticleRes] = useUpdateArticleBlocksMutation({
    fixedCacheKey: 'update-article',
  });
  const [updateLabels] = useUpdateArticleLabelsMutation();
  const article = useAppSelector(getArticle);
  const editor = useAppSelector(getEditor);
  const [isPublishModalOpen, togglePublishModal, { close: closePublishModal }] = useModal(false);
  const [isDeleteModalOpen, toggleDeleteModal, { close: closeDeleteModal }] = useModal(false);

  const isSavePressed = useShortCut('s');
  const isPublishPressed = useShortCut('p');

  const saveChanges = async (): Promise<void> => {
    if (!editor || !article) return Promise.reject();

    const editorData = await editor?.save();

    // Don't save image urls in database. Only image IDs
    const [oldBlocks, isReset] = await removeAmazonUriFromImgBlocks(editorData.blocks);

    const updatedArticle = await updateArticle({ ...article, blocks: oldBlocks }).unwrap();
    dispatch(setArticle({ ...article, ...updatedArticle }));

    if (isReset) editor.render({ blocks: addUriToImageBlocks(updatedArticle.blocks) });
  };

  const labelsChangeHandler = (labels: string[]): void => {
    if (!article) return;
    dispatch(setLabels(labels));
    updateLabels({ ...article, labels });
  };

  useEffect(() => {
    if (isSavePressed) saveChanges();
    if (isPublishPressed) togglePublishModal();
  }, [isSavePressed, isPublishPressed]);

  useEffect(() => {
    const img = new Image();
    img.src = `/icons/congrats-${theme}.apng`;
  }, [theme]);

  const StatusIcon = useMemo(() => {
    const { isLoading, isError } = updateArticleRes;
    if (isLoading) return { component: ICONS.uploading, tooltip: 'Saqlanmoqda...' };
    if (isError)
      return {
        component: ICONS.uploadError,
        tooltip: 'Saqlashda xatolik yuz berdi. Iltimos internet aloqasini tekshiring',
        color: '#cc0000',
      };
    return { component: ICONS.uploadSuccess, tooltip: 'Saqlangan', color: '#4BB543' };
  }, [updateArticleRes]);

  if (!article) return null;

  return (
    <>
      {editor && (
        <PublishArticleModal
          open={isPublishModalOpen}
          close={closePublishModal}
          editor={editor}
          article={article}
          save={saveChanges}
          isBeingSaved={updateArticleRes.isLoading}
          status={article.status}
        />
      )}
      <DeleteArticleModal
        status={article.status}
        open={isDeleteModalOpen}
        close={closeDeleteModal}
        article={article}
      />
      <div className='d-flex flex-wrap m--1 align-items-center mt-0'>
        <Button className='flex-auto m-1 mt-0 mb-0' type='button' onClick={togglePublishModal}>
          {article.status === ARTICLE_STATUSES.SAVED ? 'Nashr qilish' : 'Qayta nashr qilish'}
        </Button>
        <Tooltip tooltip={StatusIcon.tooltip} position='left'>
          <StatusIcon.component
            color={StatusIcon.color || themeColors.icon}
            width={30}
            height={30}
          />
        </Tooltip>
      </div>
      <Divider className='my-2' />
      <h2>Sozlamalar</h2>
      <div className='mb-1'>
        <div className='d-flex justify-content-between'>
          <label htmlFor='labels' className='mb-1 d-block'>
            Teglar
          </label>
        </div>
        <LabelSelector
          max={MAX_LABELS}
          defaultValues={article.tags}
          onChange={labelsChangeHandler}
          inputPlacegolder='Qidirish uchun yozing'
        />
      </div>
      <ArticleStatus className='mb-1' status={article.status}>
        {article.publishedArticleId && (
          <Link href={`${WEB_APP_ROOT_DIR}/articles/${article.publishedArticleId}`}>
            <a target={'_blank'} className='link mt-1 d-flex align-items-center f-gap-1'>
              Nashr variantini ko&apos;rish
              <ICONS.openExternal color={themeColors.icon} />
            </a>
          </Link>
        )}
      </ArticleStatus>
      <ConnectTelegram />
      <Divider className='my-2' />
      <Link href={`${WEB_APP_ROOT_DIR}/docs/write-article_introduction_quick-start`}>
        <a target={'_blank'} className='link mt-1 d-flex align-items-center f-gap-1'>
          Foydalanish uchun qo&apos;llanma
          <ICONS.openExternal color={themeColors.icon} />
        </a>
      </Link>
      <Dropdown
        title='Qoshimcha sozlamalar'
        titleClassName='my-2 pe-3'
        paddingLeft='0'
        iconSize='small'
      >
        <div className='mt-3'>
          <p className='fs-1'>
            Maqolani o&apos;chirib tashlaganingizdan so&apos;ng, orqaga qaytishning iloji yo&apos;q.
            Iltimos, ishonch hosil qiling.
          </p>
        </div>
        <div className='d-flex flex-wrap m--1 align-items-center mt-0'>
          <Button
            className='flex-auto m-1 mt-0 mb-0 fw-6'
            type='button'
            color='outline-red'
            onClick={toggleDeleteModal}
          >
            Maqolani o&apos;chirish
          </Button>
        </div>
      </Dropdown>
    </>
  );
};
