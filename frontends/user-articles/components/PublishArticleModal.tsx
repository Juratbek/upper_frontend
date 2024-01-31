import { useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Modal } from 'components/lib';
import { LabelsSelector } from 'components/molecules';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePublish, useUpdateArticleBlocks, useUpdateLabels } from 'store/clients/article';
import { getEditor } from 'store/states';
import { closePublishModal, getIsPublishModalOpen } from 'store/states/publishModal';
import { IArticle } from 'types';
import { removeAmazonUriFromImgBlocks, validateArticle } from 'utils';
import { ICONS, WEB_APP_ROOT_DIR } from 'variables';

const OpenExternal = ICONS.openExternal;

export const PublishArticleModal: FC = () => {
  const isOpen = useSelector(getIsPublishModalOpen);
  const queryClient = useQueryClient();
  const editor = useSelector(getEditor);
  const [alert, setAlert] = useState<string>();
  const dispatch = useDispatch();
  const { query } = useRouter();
  const articleId = Number(query.id);
  const article: IArticle | undefined = queryClient.getQueryData(['article', articleId]);
  const { mutate: updateArticle } = useUpdateArticleBlocks(articleId);
  const { mutate: publish, ...publishArticleRes } = usePublish(articleId, {
    onError: (error) => setAlert(error?.message),
    onSuccess: () => setAlert(''),
  });
  const { mutate: updateLabels, isPending: areLabelsBeingUpdated } = useUpdateLabels(articleId);
  const publishBtnRef = useRef<HTMLButtonElement>(null);

  const alertComponent = useMemo(
    () => (
      <Alert show={Boolean(alert)} color='red' onClose={(): void => setAlert('')} className='mb-1'>
        <div>{alert}</div>
        {/* <Link
          target='_blank'
          className='link text-underline'
          href={`${WEB_APP_ROOT_DIR}/docs/write-article_publish_requirements`}
        >
          Yo&apos;riqnomani o&apos;qish
        </Link> */}
      </Alert>
    ),
    [alert],
  );

  const publishHandler = async (): Promise<void> => {
    if (!editor) return;

    // validating article for publishing
    const editorData = await editor.save();
    const validationResult = validateArticle({ blocks: editorData.blocks });
    if (!validationResult.isValid) {
      return setAlert(validationResult.message);
    }

    const [blocks] = await removeAmazonUriFromImgBlocks(editorData.blocks);
    updateArticle({ id: articleId, blocks });
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

  const labelsChangeHandler = (tags: string[]): void => {
    updateLabels(tags);
  };

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
              <OpenExternal color='#fff' />
            </Button>
          </Link>
          <Button onClick={closePublishModalHandler} className='w-100 mt-1' color='secondary'>
            Modalni yopish
          </Button>
        </div>
      );
    }

    return (
      <>
        <h3 className='mb-2 mt-0'>Nashr qilish uchun teglarni tanlang</h3>
        {Boolean(article) && (
          <LabelsSelector
            max={5}
            defaultValues={article?.tags}
            onChange={labelsChangeHandler}
            inputPlacegolder='Qidirish uchun yozing'
          />
        )}
        <div className='d-flex mt-2'>
          <Button color='tertiary' onClick={closePublishModalHandler} className='me-1'>
            Modalni yopish
          </Button>
          <Button
            ref={publishBtnRef}
            onClick={publishHandler}
            className='flex-1'
            loading={publishArticleRes.isPending || areLabelsBeingUpdated}
            disabled={!article?.tags?.length}
          >
            Nashr qilish
          </Button>
        </div>
      </>
    );
  };

  return (
    <Modal isOpen={isOpen} close={closePublishModalHandler}>
      {alertComponent}
      {renderContent()}
    </Modal>
  );
};
