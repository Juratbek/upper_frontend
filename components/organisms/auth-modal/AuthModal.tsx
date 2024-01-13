import { AuthButton } from 'components';
import { Modal } from 'components/lib';
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
    <Modal size='small' isOpen={isOpen} close={closeModal}>
      {Boolean(Title) && <h3 className='my-1 mt-0'>{Title}</h3>}
      <AuthButton width={300} className='mx-auto' />
    </Modal>
  );
};
