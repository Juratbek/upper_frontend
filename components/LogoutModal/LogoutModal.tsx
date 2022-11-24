import { Button, Modal } from 'components';
import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { closeLogoutModal, getIsLogoutModalOpen } from 'store/states';

export const LogoutModal: FC = () => {
  const { unauthenticate } = useAuth();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(getIsLogoutModalOpen);
  const router = useRouter();

  const close = (): void => {
    dispatch(closeLogoutModal());
  };

  const logOut = (): void => {
    unauthenticate();
    close();
    router.push('/');
  };

  return (
    <Modal bodyClassName='text-center' isOpen={isOpen} close={close} size='small'>
      <h3>Profilingizdan chiqmoqchimisiz</h3>
      <div>
        <Button color='outline-dark' onClick={logOut} className='me-1'>
          Profildan chiqish
        </Button>
        <Button onClick={close}>Bekor qilish</Button>
      </div>
    </Modal>
  );
};
