import { Input } from 'components/form';
import { Alert, Button, Lordicon, Modal } from 'components/lib';
import { useTheme } from 'hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from 'store';
import { useDeleteArticleMutation } from 'store/apis';
import { setArticle } from 'store/states';
import { IArticle, IResponseError, TArticleStatus } from 'types';
import { ARTICLE_STATUSES, WEB_APP_ROOT_DIR } from 'variables';

export const DeleteArticleModal: FC<{
  open: boolean;
  article: IArticle;
  close: () => void;
  status: TArticleStatus;
}> = ({ article, ...props }): React.ReactElement => {
  const { theme } = useTheme();
  const [alert, setAlert] = useState<string>();

  const [confirmInput, setConfirmInput] = useState<SetStateAction<string>>('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [deleteArticle, deleteArticleRes] = useDeleteArticleMutation();
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  const alertComponent = useMemo(
    () => (
      <Alert show={Boolean(alert)} color='red' onClose={(): void => setAlert('')} className='mb-1'>
        <div>{alert}</div>
      </Alert>
    ),
    [],
  );

  const isConfirmedToDeletion = useMemo(() => {
    return confirmInput === "o'chirish";
  }, [confirmInput]);

  const closeDeleteArticleModal = (): void => {
    props.close();
  };

  useEffect(() => {
    if (props.open) deleteBtnRef.current?.focus();
  }, [props.open]);

  const submitDeletion = async (): Promise<void> => {
    if (isConfirmedToDeletion && article) {
      let res;

      try {
        res = await deleteArticle(article?.id);
        console.log('response', res);

        router.push(`${WEB_APP_ROOT_DIR}/articles?tab=savedArticles`);
      } catch (e) {
        const error = e as IResponseError;
        return setAlert(error.data.message);
      }
      dispatch(setArticle(null));
    }
  };

  const renderContent = (): JSX.Element => {
    if (deleteArticleRes.isSuccess) {
      return (
        <>
          <div className='text-center'>
            <Lordicon
              alt='tabriklaymiz'
              width={120}
              height={120}
              priority
              src={`/icons/congrats-${theme}.apng
            `}
            />
            <h3>Maqolangiz muvaffaqiyatli o&apos;chirildi!</h3>
            <Button onClick={closeDeleteArticleModal} className='w-100 mt-1'>
              Modalni yopish
            </Button>
          </div>
        </>
      );
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
      setConfirmInput(e.target.value);
    return (
      <>
        <Image alt='' width={0} height={0} src={`/icons/congrats-${theme}.apng`} hidden />
        {props.status === ARTICLE_STATUSES.PUBLISHED ? (
          <h3 className='mb-2 mt-0 fw-6'>
            &quot;{article.title}&quot; maqolani o&apos;chirmoqchimisiz?
          </h3>
        ) : (
          <h3 className='mb-2 mt-0 fw-6'>Ushbu saqlangan maqolani o&apos;chirmoqchimisiz?</h3>
        )}
        <div>
          <h4 className='mb-2 mt-0 fw-4'>
            Maqolani o&apos;chirish uchun <i>&quot;o&apos;chirish&quot;</i> so&apos;zini yozing
          </h4>
          <Input className='mb-2' onChange={handleChange} />
        </div>
        <div className='d-flex'>
          <Button color='outlined' onClick={closeDeleteArticleModal} className='me-1 flex-1'>
            Bekor qilish
          </Button>
          <Button
            ref={deleteBtnRef}
            onClick={submitDeletion}
            disabled={!isConfirmedToDeletion}
            loading={deleteArticleRes.isLoading}
          >
            O&apos;chirish
          </Button>
        </div>
      </>
    );
  };

  return (
    <Modal isOpen={props.open} close={closeDeleteArticleModal} bodyClassName='text-center'>
      {alertComponent}
      {renderContent()}
    </Modal>
  );
};
