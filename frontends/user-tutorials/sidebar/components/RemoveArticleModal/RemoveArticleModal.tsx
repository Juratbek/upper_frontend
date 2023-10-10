import { Button, Modal } from 'components';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { useRemoveTutorialArticleMutation } from 'store/apis';
import {
  getIsRemoveArticleModalOpen,
  getTutorialSelectedArticle,
  removeArticleModalHandler,
  removeTutorialArticle,
} from 'store/states';

export const RemoveArticleModal: FC = () => {
  const isOpen = useAppSelector(getIsRemoveArticleModalOpen);
  const dispatch = useAppDispatch();
  const {
    query: { id },
  } = useRouter();

  const selectedArticle = useAppSelector(getTutorialSelectedArticle);
  const [sendRemoveArticleReq, removeArticleRes] = useRemoveTutorialArticleMutation();

  const close = (): unknown => dispatch(removeArticleModalHandler(false));

  if (!selectedArticle || !id) return null;

  const removeArticle = async (): Promise<void> => {
    await sendRemoveArticleReq({ tutorialId: +id, articleId: selectedArticle.id }).unwrap();
    close();
    dispatch(removeTutorialArticle(selectedArticle.id));
  };

  return (
    <Modal isOpen={isOpen} close={close} color='outline-red'>
      <h3 className='text-center'>&quot;{selectedArticle.name}&quot;ni o&apos;chirmoqchimisiz?</h3>
      <div className='mt-2 d-flex justify-content-end'>
        <Button color='outlined' className='me-1' onClick={close}>
          Modalni yopish
        </Button>
        <Button onClick={removeArticle} loading={removeArticleRes.isLoading}>
          O&apos;chirish
        </Button>
      </div>
    </Modal>
  );
};
