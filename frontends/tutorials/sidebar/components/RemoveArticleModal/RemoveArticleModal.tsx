import { Modal } from 'components';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { getIsRemoveArticleModalOpen, toggleRemoveArticleModal } from 'store/states';

export const RemoveArticleModal: FC = () => {
  const isOpen = useAppSelector(getIsRemoveArticleModalOpen);
  const dispatch = useAppDispatch();

  const close = (): unknown => dispatch(toggleRemoveArticleModal());

  return (
    <Modal isOpen={isOpen} close={close}>
      remove article modal
    </Modal>
  );
};
