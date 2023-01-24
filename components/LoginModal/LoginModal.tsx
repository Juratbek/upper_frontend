import { Alert, Button, Error, Input, Modal, Recaptcha, TelegramLoginButton } from 'components';
import { useAuth } from 'hooks';
import Head from 'next/head';
import Link from 'next/link';
import { FC, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { useLoginMutation } from 'store/apis';
import {
  closeLoginModal,
  getIsModalOpen,
  getLoginModalTitle,
  openRegisterModal,
} from 'store/states';
import { IResponseError, TSubmitFormEvent } from 'types';

import { LOGIN_FORM_FIELDS } from './LoginModal.constants';

const { login, password, recaptcha } = LOGIN_FORM_FIELDS;

export const LoginModal: FC = () => {
  const [alert, setAlert] = useState<string>('');
  const recaptchaRef = useRef<{ reset: () => void }>(null);
  const isOpen = useAppSelector(getIsModalOpen);
  const Title = useAppSelector(getLoginModalTitle);
  const dispatch = useAppDispatch();
  const [loginBlog, loginBlogResponse] = useLoginMutation();
  const { authenticate } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
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
      const { login, password, recaptcha } = event;
      const res = await loginBlog({
        username: login,
        password,
        reCaptchaResponse: recaptcha,
      }).unwrap();
      authenticate(res);
      closeModal();
      reset();
    } catch (e) {
      console.error(e);
      const error = e as IResponseError;
      if (error.status === 404) {
        setAlert('Login yoki parol xato kiritilgan!');
      }
      if (error.status === 400) {
        setAlert('Bot emasligingizni qayta tasdiqlang!');
      }
    } finally {
      recaptchaRef.current?.reset();
    }
  };

  const closeAlert = (): void => setAlert('');

  const alertComponent = useMemo(() => {
    if (!alert) return <></>;
    return (
      <Alert color='red' className='mb-1' onClose={closeAlert}>
        {alert}
      </Alert>
    );
  }, [alert]);

  return (
    <Modal size='small' isOpen={isOpen} close={closeModal}>
      <Head>
        <meta
          name='google-signin-client_id'
          content='578132262483-mp1bv5i0pp46fmh0d8hvi0qe7t29g9p0.apps.googleusercontent.com'
        />
      </Head>
      {alertComponent}
      <form onSubmit={handleSubmit(submitHandler)}>
        {Boolean(Title) && <h3 className='my-1 mt-0'>{Title}</h3>}
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
        <div className='form-element'>
          <Controller
            control={control}
            name={recaptcha.name}
            rules={recaptcha.options}
            render={({ field: { onChange } }): JSX.Element => (
              <Recaptcha
                className='mb-1 login'
                siteKey={process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY || ''}
                onSuccess={onChange}
                onExpired={(): void => onChange(null)}
                ref={recaptchaRef}
              />
            )}
          />
          <Error error={errors[recaptcha.name]} />
        </div>

        <Button className='d-block w-100 mb-1' loading={loginBlogResponse.isLoading}>
          Kirish
        </Button>
        <Button className='d-block w-100' color='outline-dark' type='button' onClick={registerUser}>
          Ro`yxatdan o`tish
        </Button>
        <p className='text-gray text-center' onClick={closeModal}>
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
