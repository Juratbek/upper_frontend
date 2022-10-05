import { Alert, Button, Error, Input, Modal, TelegramLoginButton } from 'components';
import { useAuth } from 'hooks';
import Head from 'next/head';
import Script from 'next/script';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { useLoginMutation } from 'store/apis';
import { closeLoginModal, getIsModalOpen, openRegisterModal } from 'store/states';
import { IResponseError, TSubmitFormEvent } from 'types';
import { ICON_TYPES, ICONS, TELEGRAM_BOT } from 'variables';

import { LOGIN_FORM_FIELDS } from './LoginModal.constants';
import classes from './LoginModal.module.scss';

const { login, password } = LOGIN_FORM_FIELDS;

const GoogleIcon = ICONS[ICON_TYPES.google];

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
      authenticate(res.token);
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

  const load = (): void => {
    gapi.load('client:auth2', initClient);
  };

  const initClient = (): void => {
    gapi.client
      .init({
        clientId: '903867805040-420t2srp93r2777e6aqbgdvnv2eg6fai.apps.googleusercontent.com',
      })
      .then(() => {
        console.log(gapi.auth2.getAuthInstance);
        gapi.auth2.getAuthInstance().signIn();
      });
  };

  const onLoadHandler = (): void => {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: console.log,
      onfailure: (err: any) => {
        console.log('🚀 ~ file: LoginModal.tsx ~ line 85 ~ onLoadHandler ~ err', err);
      },
    });
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
        <TelegramLoginButton className='mt-2 text-center' botName='udas_bot' onAuth={console.log} />
        <div className='d-flex'>
          <div className={classes['media-icon']} onClick={load}>
            <GoogleIcon />
          </div>
        </div>
      </form>
      <div id='my-signin2'>sign in</div>
      <Script
        src='https://apis.google.com/js/platform.js'
        async
        onLoad={onLoadHandler}
        defer
      ></Script>
    </Modal>
  );
};
