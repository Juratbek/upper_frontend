import { ArticleStatus, Button, Divider, IOption, MultiSelect } from 'components';
import { useModal, useShortCut, useTheme } from 'hooks';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useLazySearchLabelsQuery, useUpdateArticleMutation } from 'store/apis';
import { getArticle, getEditor, setArticle, setLabels } from 'store/states';
import {
  addUriToImageBlocks,
  convertLabelsToOptions,
  convertOptionsToLabels,
  removeAmazonUriFromImgBlocks,
} from 'utils';
import { ARTICLE_STATUSES, ICONS, MAX_LABELS, WEB_APP_ROOT_DIR } from 'variables';

import { PublishArticleModal } from './components/PublishArticleModal';

export const UserArticlesSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const { themeColors } = useTheme();

  const article = useAppSelector(getArticle);
  const editor = useAppSelector(getEditor);
  const [isPublishModalOpen, togglePublishModal, { close: closePublishModal }] = useModal(false);

  const [updateArticle, updateArticleRes] = useUpdateArticleMutation();
  const [searchLabels, searchLabelsRes] = useLazySearchLabelsQuery();

  const isSavePressed = useShortCut('s');
  const isPublishPressed = useShortCut('p');

  const saveChanges = async (): Promise<void> => {
    if (!editor || !article) return Promise.reject();

    const editorData = await editor?.save();
    console.log(
      '🚀 ~ file: UserArticlesSidebar.tsx:36 ~ saveChanges ~ editorData',
      editorData.blocks,
    );

    // Don't save image urls in database. Only image IDs
    // const [oldBlocks, isReset] = await removeAmazonUriFromImgBlocks(editorData.blocks);
    // const title = oldBlocks.find((block) => block.type === 'header')?.data.text;

    // const updatedArticle = await updateArticle({ ...article, title, blocks: oldBlocks }).unwrap();
    // dispatch(setArticle({ ...article, ...updatedArticle }));

    // if (isReset) editor.render({ blocks: addUriToImageBlocks(updatedArticle.blocks) });
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
          saving={updateArticleRes.isLoading}
          status={article.status}
        />
      )}
      <>
        <div className='d-flex flex-wrap m--1'>
          <Button
            className='flex-auto m-1 mb-0'
            color='outline-dark'
            type='button'
            onClick={saveChanges}
            loading={updateArticleRes.isLoading}
          >
            Saqlash
          </Button>
          <Button
            className='flex-auto m-1 mb-0'
            type='button'
            onClick={togglePublishModal}
            disabled={updateArticleRes.isLoading}
          >
            {article.status === ARTICLE_STATUSES.SAVED ? 'Nashr qilish' : 'Qayta nashr qilish'}
          </Button>
        </div>
      </>
      <Divider className='my-2' />
      <h2>Sozlamalar</h2>
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
      <ArticleStatus className='mb-1' status={article.status}>
        {article.publishedArticleId && (
          <Link href={`${WEB_APP_ROOT_DIR}/articles/${article.publishedArticleId}`}>
            <a target={'_blank'} className='link mt-1 d-flex align-items-center f-gap-1'>
              Nashr varyantini ko&apos;rish
              <ICONS.openExternal color={themeColors.icon} />
            </a>
          </Link>
        )}
      </ArticleStatus>
    </>
  );
};
