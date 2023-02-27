import {
  Alert,
  Button,
  Error,
  GitHubSignIn,
  GoogleSignIn,
  Input,
  Modal,
  PasswordValidityLevel,
  Recaptcha,
  TelegramLoginButton,
  Textarea,
} from 'components';
import { useAuth } from 'hooks';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { useRegisterMutation } from 'store/apis';
import { closeRegisterModal, getIsRegisterModalOpen } from 'store/states/registerModal';
import { IResponseError, TSubmitFormEvent } from 'types';

import { REGISTER_FORM_FIELDS } from './RegisterModal.constants';

const { name, bio, login, password, email, recaptcha } = REGISTER_FORM_FIELDS;

export const RegisterModal: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [alert, setAlert] = useState<string>();
  const isOpen = useAppSelector(getIsRegisterModalOpen);
  const dispatch = useAppDispatch();
  const { authenticate } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setFocus,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [createBlog, createBlogResponse] = useRegisterMutation();
  const recaptchaRef = useRef<{ reset: () => void }>(null);

  const closeModal = (): void => {
    dispatch(closeRegisterModal());
  };

  const incrementStep = (): void => {
    setActiveStep((prev) => prev + 1);
  };

  const decrementStep = (): void => {
    setActiveStep((prev) => prev - 1);
  };

  const submitHandler = async (event: TSubmitFormEvent): Promise<void> => {
    const { name, bio, login, password, email, recaptcha } = event;
    const payload = {
      ...(bio && { bio: bio }),
      ...(email && { email: email }),
      name,
      username: login,
      password,
    };

    try {
      const res = await createBlog({
        ...payload,
        reCaptchaResponse: recaptcha,
      }).unwrap();
      authenticate(res);
      closeModal();
      reset();
      setActiveStep(1);
      recaptchaRef.current?.reset();
    } catch (e) {
      const error = e as IResponseError;
      console.error(error);
      if (error.status === 409) {
        setAlert(error.data.message);
      }
      if (error.status === 400) {
        recaptchaRef.current?.reset();
        setAlert('Iltimos bot emasligingizni qayta tasdiqlang');
      }
    }
  };

  const errorHandler = async (e: FieldErrors): Promise<void> => {
    if (activeStep === 1) {
      if (!(name.name in e || bio.name in e)) {
        incrementStep();
        clearErrors();
      }
    }
  };

  const closeAlert = (): void => setAlert(undefined);

  useEffect(() => {
    if (activeStep === 2) {
      setFocus(login.name);
    }
  }, [activeStep]);

  useEffect(() => {
    isOpen && setFocus(name.name);
  }, [isOpen]);

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
      {alertComponent}
      <form onSubmit={handleSubmit(submitHandler, errorHandler)}>
        <div className={activeStep === 1 ? 'd-block' : 'd-none'}>
          <div className='form-element'>
            <label htmlFor='name' className='d-block mb-1'>
              Blog nomi
            </label>
            <Input id='name' {...register(name.name, name.options)} />
            <Error error={errors[name.name]} />
          </div>
          <div className='form-element'>
            <label htmlFor='bio' className='d-block mb-1'>
              Bio (ixtiyoriy)
            </label>
            <Textarea id='bio' {...register(bio.name, bio.options)} />
            <Error error={errors[bio.name]} />
          </div>
        </div>
        <div className={activeStep === 2 ? 'd-block' : 'd-none'}>
          <div className='form-element'>
            <label htmlFor='login' className='d-block mb-1'>
              Loginni kiriting
            </label>
            <Input id='login' {...register(login.name, login.options)} />
            <Error error={errors[login.name]} />
          </div>
          <div className='form-element'>
            <label htmlFor='email' className='d-block mb-1'>
              Elektron pochta (ixtiyoriy)
            </label>
            <Input
              id='email'
              placeholder='pochta@mail.com'
              type='email'
              {...register(email.name, email.options)}
            />
            <Error error={errors[email.name]} />
          </div>
          <div className='form-element'>
            <label htmlFor='password' className='d-block mb-1'>
              Parolni kiriting
            </label>
            <Input id='password' type='password' {...register(password.name, password.options)} />
            <PasswordValidityLevel password={watch(password.name)} />
          </div>
          <div className='form-element'>
            <label htmlFor='check-password' className='d-block mb-1'>
              Parolni qayta kiriting
            </label>
            <Input
              id='check-password'
              type='password'
              {...register('check-password', {
                required: 'Parolni takrorlang',
                validate: (value) => value === watch(password.name),
              })}
            />
            <Error error={errors['check-password']} />
          </div>
          <div className='form-element'>
            <Controller
              control={control}
              name={recaptcha.name}
              rules={recaptcha.options}
              render={({ field: { onChange } }): JSX.Element => (
                <Recaptcha
                  className='mb-1 register'
                  siteKey={process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY || ''}
                  onSuccess={onChange}
                  onExpired={(): void => onChange(null)}
                  ref={recaptchaRef}
                />
              )}
            />
            <Error error={errors[recaptcha.name]} />
          </div>
        </div>
        <Button className='d-block w-100 mb-1' loading={createBlogResponse.isLoading}>
          {activeStep === 2 ? "Ro'yxatdan o'tish" : 'Davom etish'}
        </Button>
        {activeStep !== 1 && (
          <Button color='outline-dark' className='w-100' onClick={decrementStep}>
            Ortga
          </Button>
        )}
      </form>
      <TelegramLoginButton
        className='mt-2 text-center'
        botName={process.env.NEXT_PUBLIC_REGISTER_BOT_USERNAME || 'upper_test_bot'}
        onAuth={closeModal}
      />
      <GoogleSignIn id='google-sign-up' />
      <GitHubSignIn className='w-100 mt-1' />
    </Modal>
  );
};
