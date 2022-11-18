import { Alert, Button, Error, Input, Modal, TelegramLoginButton } from 'components';
import { useAuth } from 'hooks';
import Head from 'next/head';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { useLoginMutation } from 'store/apis';
import { closeLoginModal, getIsModalOpen, openRegisterModal } from 'store/states';
import { IResponseError, TSubmitFormEvent } from 'types';
import { TELEGRAM_BOT } from 'variables';

import { LOGIN_FORM_FIELDS } from './LoginModal.constants';

const { login, password } = LOGIN_FORM_FIELDS;

export const LoginModal: FC = () => {
  const [hasAlert, setHasAlert] = useState<boolean>(false);
  const isOpen = useAppSelector(getIsModalOpen);
  const dispatch = useAppDispatch();
  const [loginBlog, loginBlogResponse] = useLoginMutation();
  const { authenticate } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors },
  } = useForm();

  const closeModal = (): void => {
    dispatch(closeLoginModal());
  };

  const registerUser = (): void => {
    dispatch(openRegisterModal());
    closeModal();
  };

  const submitHandler = async (event: TSubmitFormEvent): Promise<void> => {
    try {
      const { login, password } = event;
      const res = await loginBlog({ username: login, password }).unwrap();
      authenticate(res);
      closeModal();
    } catch (e) {
      console.error(e);
      const error = e as IResponseError;
      if (error.status === 404) {
        setError(password.name, { message: 'Login yoki parol xato kiritilgan!' });
        setFocus(login.name);
      } else {
        setHasAlert(true);
      }
    }
  };

  return (
    <Modal size='small' isOpen={isOpen} close={closeModal}>
      <Head>
        <meta
          name='google-signin-client_id'
          content='578132262483-mp1bv5i0pp46fmh0d8hvi0qe7t29g9p0.apps.googleusercontent.com'
        />
      </Head>
      {hasAlert && (
        <Alert color='yellow' className='mb-1'>
          Xatolik yuz berdi. Iltimos bu haqda&nbsp;
          <a className='text-blue' href={TELEGRAM_BOT.link} target='_blank' rel='noreferrer'>
            {TELEGRAM_BOT.name}
          </a>
          &nbsp;telegram botiga habar bering.
        </Alert>
      )}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='form-element'>
          <label htmlFor='login' className='d-block mb-1'>
            Loginni kiriting
          </label>
          <Input id='login' {...register(login.name, login.options)} />
          <Error error={errors[login.name]} />
        </div>
        <div className='form-element'>
          <label htmlFor='password' className='d-block mb-1'>
            Parolni kiriting
          </label>
          <Input type='password' id='password' {...register(password.name, password.options)} />
          <Error error={errors[password.name]} />
        </div>
        <Button className='d-block w-100 mb-1' loading={loginBlogResponse.isLoading}>
          Kirish
        </Button>
        <Button className='d-block w-100' color='outline-dark' type='button' onClick={registerUser}>
          Ro`yxatdan o`tish
        </Button>
        <p className='text-gray text-center'>
          <Link href='/forgot-credentials'>
            <a className='link'>Login yoki parolni unutdingizmi?</a>
          </Link>
        </p>

        <TelegramLoginButton
          className='mt-2 text-center'
          botName={process.env.NEXT_PUBLIC_BOT_USERNAME || 'upperuz_bot'}
          onAuth={closeModal}
        />
      </form>
    </Modal>
  );
};
