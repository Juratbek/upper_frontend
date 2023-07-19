import { GitHubSignIn, GoogleAuthScript, Modal, TelegramLoginButton } from 'components';
import { GoogleSignIn } from 'components/GoogleSignIn';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { closeLoginModal, getIsModalOpen } from 'store/states';

import { LoginForm } from './components';

export const LoginModal: FC = () => {
  const isOpen = useAppSelector(getIsModalOpen);
  const dispatch = useAppDispatch();

  const closeModal = (): void => {
    dispatch(closeLoginModal());
  };

  return (
    <Modal size='small' isOpen={isOpen} close={closeModal}>
      <LoginForm closeModal={closeModal} showRegisterForm={console.log} />
      <GoogleAuthScript />
      <GoogleSignIn id='google-sign-in' className='mt-2' />
      <GitHubSignIn text='GitHub orqali kirish' className='w-100 mt-1' />
      <TelegramLoginButton
        className='mt-1 text-center'
        botName={process.env.NEXT_PUBLIC_BOT_USERNAME || 'upperuz_bot'}
        onAuth={closeModal}
      />
    </Modal>
  );
};
