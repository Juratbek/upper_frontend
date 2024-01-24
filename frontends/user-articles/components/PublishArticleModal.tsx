import { Alert, Button, Modal } from 'components/lib';
import { useTheme } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePublish, useUpdateArticleBlocks } from 'store/clients/article';
import { getArticle, getEditor } from 'store/states';
import { closePublishModal, getIsPublishModalOpen } from 'store/states/publishModal';
import { removeAmazonUriFromImgBlocks, validateArticle } from 'utils';
import { ICONS, WEB_APP_ROOT_DIR } from 'variables';

const OpenExternal = ICONS.openExternal;

export const PublishArticleModal: FC = () => {
  const isOpen = useSelector(getIsPublishModalOpen);
  const article = useSelector(getArticle);
  const editor = useSelector(getEditor);
  const [alert, setAlert] = useState<string>();
  const { themeColors } = useTheme();
  const dispatch = useDispatch();
  const articleId = Number(article?.id);
  const { mutate: updateArticle } = useUpdateArticleBlocks(articleId);
  const { mutate: publish, ...publishArticleRes } = usePublish(articleId, {
    onError: (error) => setAlert(error?.data?.message),
  });
  const publishBtnRef = useRef<HTMLButtonElement>(null);

  const alertComponent = useMemo(
    () => (
      <Alert show={Boolean(alert)} color='red' onClose={(): void => setAlert('')} className='mb-1'>
        <div>{alert}</div>
        <Link
          target='_blank'
          className='link text-underline'
          href={`${WEB_APP_ROOT_DIR}/docs/write-article_publish_requirements`}
        >
          Yo&apos;riqnomani o&apos;qish
        </Link>
      </Alert>
    ),
    [alert],
  );

  const publishHandler = async (): Promise<void> => {
    if (!article || !editor) return;

    // validating article for publishing
    const editorData = await editor.save();
    const validationResult = validateArticle({ ...article, blocks: editorData.blocks });
    if (!validationResult.isValid) {
      return setAlert(validationResult.message);
    }

    const [blocks] = await removeAmazonUriFromImgBlocks(editorData.blocks);
    await updateArticle({ id: articleId, blocks });
    publish();
  };

  const closePublishModalHandler = (): void => {
    dispatch(closePublishModal());
    setAlert('');
    publishArticleRes.reset();
  };

  useEffect(() => {
    if (isOpen) publishBtnRef.current?.focus();
  }, [isOpen]);

  const renderContent = (): JSX.Element => {
    if (publishArticleRes.isSuccess) {
      return (
        <div className='text-center'>
          <Image
            src='/images/congrats.png'
            width={150}
            height={150}
            objectFit='cover'
            priority
            alt='congrats icon'
          />

          <h3>Maqolangiz nashr qilindi</h3>
          <Link href={`${WEB_APP_ROOT_DIR}/articles/${publishArticleRes.data}`} target='_blank'>
            <Button className='d-flex align-items-center f-gap-1 w-100 justify-content-center'>
              Nashr variantini ko&apos;rish
              <OpenExternal color={themeColors.icon} />
            </Button>
          </Link>
          <Button onClick={closePublishModalHandler} className='w-100 mt-1'>
            Modalni yopish
          </Button>
        </div>
      );
    }

    return (
      <>
        <h3 className='mb-2 mt-0'>
          {article?.status === 'PUBLISHED'
            ? 'Maqolangizni qayta nashr qilmoqchimisiz?'
            : 'Maqolangizni nashr qilmoqchimisiz?'}
        </h3>
        <div className='d-flex'>
          <Button color='tertiary' onClick={closePublishModalHandler} className='me-1'>
            Modalni yopish
          </Button>
          <Button
            ref={publishBtnRef}
            onClick={publishHandler}
            className='flex-1'
            loading={publishArticleRes.isLoading}
          >
            Nashr qilish
          </Button>
        </div>
      </>
    );
  };

  return (
    <Modal isOpen={isOpen} close={closePublishModalHandler} bodyClassName='text-center'>
      {alertComponent}
      {renderContent()}
    </Modal>
  );
};
