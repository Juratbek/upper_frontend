import { Modal } from 'components/lib';
import { AuthButton } from 'components/molecules';
import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { closeAuthModal, getAuthModalTitle, getIsAuthModalOpen } from 'store/states';

export const AuthModal: FC = () => {
  const isOpen = useAppSelector(getIsAuthModalOpen);
  const dispatch = useAppDispatch();
  const Title = useAppSelector(getAuthModalTitle);

  const closeModal = useCallback(() => {
    dispatch(closeAuthModal());
  }, []);

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      {Boolean(Title) && <h3 className='my-1 mt-0'>{Title}</h3>}
      <AuthButton>Kirish</AuthButton>
    </Modal>
  );
};
