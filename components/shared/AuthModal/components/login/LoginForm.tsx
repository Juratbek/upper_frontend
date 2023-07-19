import { Alert, Button, Error, Input, Recaptcha } from 'components';
import { useAuth } from 'hooks';
import { useDevice } from 'hooks';
import Link from 'next/link';
import { FC, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppSelector } from 'store';
import { useLoginMutation } from 'store/apis';
import { getLoginModalTitle } from 'store/states';
import { IResponseError, TNoop, TSubmitFormEvent } from 'types';
import { WEB_APP_ROOT_DIR } from 'variables';

import { LOGIN_FORM_FIELDS } from './LoginForm.constants';

const { login, password, recaptcha } = LOGIN_FORM_FIELDS;

export const LoginForm: FC<{ closeModal: TNoop; showRegisterForm: TNoop }> = ({
  closeModal,
  showRegisterForm,
}) => {
  const [alert, setAlert] = useState<string>('');
  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const Title = useAppSelector(getLoginModalTitle);
  const recaptchaRef = useRef<{ reset: () => void }>(null);
  const { isMobile } = useDevice();
  const { authenticate } = useAuth();
  const [loginBlog, loginBlogResponse] = useLoginMutation();

  const closeAlert = (): void => setAlert('');

  // useEffect(() => {
  //   isOpen && !isMobile && setFocus(login.name);
  // }, [isOpen, isMobile]);

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

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Alert show={Boolean(alert)} color='red' className='mb-1' onClose={closeAlert}>
        {alert}
      </Alert>
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
      <Button
        className='d-block w-100'
        color='outline-dark'
        type='button'
        onClick={showRegisterForm}
      >
        Ro&apos;yxatdan o&apos;tish
      </Button>
      <p className='text-gray text-center' onClick={closeModal}>
        <Link href={`${WEB_APP_ROOT_DIR}/forgot-credentials`}>
          <a className='link'>Login yoki parolni unutdingizmi?</a>
        </Link>
      </p>
    </form>
  );
};
