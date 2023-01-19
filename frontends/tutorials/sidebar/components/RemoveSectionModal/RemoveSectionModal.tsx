import { Modal } from 'components';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { getIsRemoveSectionModalOpen, toggleRemoveSectionModal } from 'store/states';

export const RemoveSectionModal: FC = () => {
  const isOpen = useAppSelector(getIsRemoveSectionModalOpen);
  const dispatch = useAppDispatch();

  const close = (): unknown => dispatch(toggleRemoveSectionModal());

  return (
    <Modal isOpen={isOpen} close={close}>
      remove section modal
    </Modal>
  );
};
