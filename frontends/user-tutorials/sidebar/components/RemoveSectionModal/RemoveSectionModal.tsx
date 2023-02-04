import { Modal } from 'components';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { closeRemoveSectionModal, getIsRemoveSectionModalOpen } from 'store/states';

export const RemoveSectionModal: FC = () => {
  const isOpen = useAppSelector(getIsRemoveSectionModalOpen);
  const dispatch = useAppDispatch();

  const close = (): unknown => dispatch(closeRemoveSectionModal());

  return (
    <Modal isOpen={isOpen} close={close}>
      remove section modal
    </Modal>
  );
};
