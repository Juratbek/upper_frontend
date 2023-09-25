import { Divider, GitHubSignIn, GoogleAuthScript, Modal } from 'components';
import { GoogleSignIn } from 'components/GoogleSignIn';
import { FC, useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { closeAuthModal, getIsAuthModalOpen } from 'store/states';

import { LoginForm, RegisterForm, TelegramLogin } from './components';

export const AuthModal: FC = () => {
  const [currentFormType, setCurrentFormType] = useState<'login' | 'register'>('login');
  const isOpen = useAppSelector(getIsAuthModalOpen);
  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => {
    setCurrentFormType('login');
    dispatch(closeAuthModal());
  }, []);

  const showRegisterForm = useCallback(() => setCurrentFormType('register'), []);

  const form = useMemo(() => {
    if (currentFormType === 'login')
      return <LoginForm closeModal={closeModal} showRegisterForm={showRegisterForm} />;
    if (currentFormType === 'register') return <RegisterForm closeModal={closeModal} />;
    return null;
  }, [closeModal, showRegisterForm, currentFormType]);

  return (
    <Modal size='small' isOpen={isOpen} close={closeModal}>
      {form}
      <Divider className='mt-2' />
      {/* <GoogleAuthScript /> */}
      {/* <GoogleSignIn id='google-sign-in' className='mt-2' /> */}
      <GitHubSignIn text='GitHub orqali kirish' className='w-100 mt-1' />
      <TelegramLogin onAuth={closeModal} />
    </Modal>
  );
};
