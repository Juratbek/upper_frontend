import EditorJS from '@editorjs/editorjs';
import { Alert, Button, Input, Lordicon, Modal } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useAppDispatch } from 'store';
import { usePublishMutation } from 'store/apis';
import { setArticle } from 'store/states';
import { IArticle, IResponseError, TArticleStatus } from 'types';
import { validateArticle } from 'utils';
import { ARTICLE_STATUSES, WEB_APP_ROOT_DIR } from 'variables';

export const PublishArticleModal: FC<{
  open: boolean;
  editor: EditorJS;
  article: IArticle;
  save: () => Promise<void>;
  saving: boolean;
  close: () => void;
  status: TArticleStatus;
}> = ({ editor, article, ...props }) => {
  const [alert, setAlert] = useState<string>();
  const [isNotificationOn, setIsNotificationOn] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [publishArticle, publishArticleRes] = usePublishMutation();

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

    let res;
    try {
      await props.save();
      res = await publishArticle({ id: article.id, notificationsOn: isNotificationOn }).unwrap();
    } catch (e) {
      const error = e as IResponseError;
      return setAlert(error.data.message);
    }
    dispatch(setArticle({ ...article, ...res }));
  };

  const closePublishModalHandler = (): void => {
    props.close();
    setAlert('');
    publishArticleRes.reset();
  };

  const notificationRadioInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target?.value;
    if (value === 'false') setIsNotificationOn(false);
    if (value === 'true') setIsNotificationOn(true);
  };

  const renderContent = (): JSX.Element => {
    if (publishArticleRes.isSuccess) {
      return (
        <>
          <div className='text-center'>
            <Lordicon width={100} height={100} src='/icons/congrats.webp' />
            <h3>Maqolangiz nashr qilindi</h3>
            <Button onClick={closePublishModalHandler}>Modalni yopish</Button>
          </div>
        </>
      );
    }
    return (
      <>
        <Image width={0} height={0} src='/icons/congrats.webp' hidden />
        <h3 className='mb-2 mt-0'>
          {props.status === 'SAVED'
            ? 'Maqolangizni nashr qilmoqchimisiz?'
            : 'Maqolangizni qayta nashr qilmoqchimisiz?'}
        </h3>
        {props.status === ARTICLE_STATUSES.SAVED && (
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
            loading={publishArticleRes.isLoading || props.saving}
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
