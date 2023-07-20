import { GitHubSignIn, GoogleAuthScript, Modal, TelegramLoginButton } from 'components';
import { GoogleSignIn } from 'components/GoogleSignIn';
import { FC, useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { closeAuthModal, getIsAuthModalOpen } from 'store/states';

import { LoginForm, RegisterForm } from './components';

export const LoginModal: FC = () => {
  const [currentFormType, setCurrentFormType] = useState<'login' | 'register'>('login');
  const isOpen = useAppSelector(getIsAuthModalOpen);
  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => {
    dispatch(closeAuthModal());
  }, []);

  const showRegisterForm = useCallback(() => setCurrentFormType('register'), []);

  const form = useMemo(() => {
    if (currentFormType === 'login')
      return <LoginForm closeModal={closeModal} showRegisterForm={showRegisterForm} />;
    if (currentFormType === 'register') return <RegisterForm />;
    return null;
  }, [closeModal, showRegisterForm, currentFormType]);

  return (
    <Modal size='small' isOpen={isOpen} close={closeModal}>
      {form}
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
