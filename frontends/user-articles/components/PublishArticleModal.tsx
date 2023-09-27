import EditorJS from '@editorjs/editorjs';
import { Alert, Button, Modal } from 'components';
import { useTheme } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from 'store';
import { useGetConnectedTelegramChannelsQuery, usePublishMutation } from 'store/apis';
import { setArticle } from 'store/states';
import { IArticle, IResponseError, TArticleStatus } from 'types';
import { validateArticle } from 'utils';
import { ARTICLE_STATUSES, ICONS, WEB_APP_ROOT_DIR } from 'variables';

import { ConnectedTelegramChannels } from './ConnectedTelegramChannels';

export const PublishArticleModal: FC<{
  open: boolean;
  editor: EditorJS;
  article: IArticle;
  save: () => Promise<void>;
  close: () => void;
  status: TArticleStatus;
}> = ({ editor, article, ...props }) => {
  const [alert, setAlert] = useState<string>();
  const [unselectedChannels, setUnselectedChannels] = useState<number[]>([]);
  const { themeColors, theme } = useTheme();
  const dispatch = useAppDispatch();
  const [publishArticle, publishArticleRes] = usePublishMutation();
  const publishBtnRef = useRef<HTMLButtonElement>(null);
  const { data: channels, isLoading: isChannelsLoading } = useGetConnectedTelegramChannelsQuery(
    undefined,
    {
      skip: !props.open || article.status !== ARTICLE_STATUSES.SAVED,
    },
  );

  const alertComponent = useMemo(
    () => (
      <Alert show={Boolean(alert)} color='red' onClose={(): void => setAlert('')} className='mb-1'>
        <div>{alert}</div>
        <Link href={`${WEB_APP_ROOT_DIR}/docs/write-article_publish_requirements`}>
          <a target='_blank' className='link text-underline'>
            Yo&apos;riqnomani o&apos;qish
          </a>
        </Link>
      </Alert>
    ),
    [alert],
  );

  const publish = async (): Promise<void> => {
    // validating article for publishing
    const editorData = await editor.save();
    const validationResult = validateArticle({ ...article, blocks: editorData.blocks });
    if (!validationResult.isValid) {
      return setAlert(validationResult.message);
    }

    try {
      await props.save();
      const channelIds = channels
        ?.filter((channel) => !unselectedChannels.includes(channel.id))
        .map((channel) => channel.id);
      const res = await publishArticle({ id: article.id, channelIds }).unwrap();
      dispatch(setArticle({ ...article, ...res }));
    } catch (e) {
      const error = e as IResponseError;
      return setAlert(error.data.message);
    }
  };

  const closePublishModalHandler = (): void => {
    props.close();
    setAlert('');
    publishArticleRes.reset();
  };

  useEffect(() => {
    if (props.open) publishBtnRef.current?.focus();
  }, [props.open]);

  const renderContent = (): JSX.Element => {
    if (publishArticleRes.isSuccess) {
      return (
        <>
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
            <Link href={`${WEB_APP_ROOT_DIR}/articles/${article.publishedArticleId}`}>
              <a target={'_blank'}>
                <Button className='d-flex align-items-center f-gap-1 w-100 justify-content-center'>
                  Nashr variantini ko&apos;rish
                  <ICONS.openExternal color={themeColors.icon} />
                </Button>
              </a>
            </Link>
            <Button onClick={closePublishModalHandler} className='w-100 mt-1'>
              Modalni yopish
            </Button>
          </div>
        </>
      );
    }
    return (
      <>
        <h3 className='mb-2 mt-0'>
          {props.status === 'SAVED'
            ? 'Maqolangizni nashr qilmoqchimisiz?'
            : 'Maqolangizni qayta nashr qilmoqchimisiz?'}
        </h3>
        {channels && channels.length > 0 && (
          <ConnectedTelegramChannels
            channels={channels}
            onSelectionChange={setUnselectedChannels}
          />
        )}
        <div className='d-flex'>
          <Button color='outline-dark' onClick={closePublishModalHandler} className='me-1'>
            Modalni yopish
          </Button>
          <Button
            ref={publishBtnRef}
            onClick={publish}
            className='flex-1'
            loading={publishArticleRes.isLoading || isChannelsLoading}
          >
            Nashr qilish
          </Button>
        </div>
      </>
    );
  };

  return (
    <Modal
      size='small'
      isOpen={props.open}
      close={closePublishModalHandler}
      bodyClassName='text-center'
    >
      {alertComponent}
      {renderContent()}
    </Modal>
  );
};
