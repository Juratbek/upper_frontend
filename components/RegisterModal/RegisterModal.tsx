import { Button, Error, Input, Modal, TelegramLoginButton, Textarea } from 'components';
import { useAuth } from 'hooks';
import { FC, useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { useRegisterMutation } from 'store/apis';
import { closeRegisterModal, getIsRegisterModalOpen } from 'store/states/registerModal';
import { IResponseError, TSubmitFormEvent } from 'types';

import { PASSWORD_VALIDITY_REQUIREMENTS, REGISTER_FORM_FIELDS } from './RegisterModal.constants';
import classes from './RegisterModal.module.scss';
import { IPasswordValidityLevelProps, TValidityRequirement } from './RegisterModal.types';

const { name, bio, login, password } = REGISTER_FORM_FIELDS;

export const RegisterModal: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const isOpen = useAppSelector(getIsRegisterModalOpen);
  const dispatch = useAppDispatch();
  const { authenticate } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    setFocus,
    formState: { errors },
  } = useForm();
  const [createBlog, createBlogResponse] = useRegisterMutation();

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
    const { name, bio, login, password } = event;
    try {
      const res = await createBlog({
        name,
        bio,
        username: login,
        password,
      }).unwrap();
      authenticate(res);
      closeModal();
    } catch (e) {
      const error = e as IResponseError;
      console.error(error);
      if (error.status === 409) {
        setError('login', { type: 'value', message: error.data.message }, { shouldFocus: true });
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

  useEffect(() => {
    if (activeStep === 2) {
      setFocus(login.name);
    }
  }, [activeStep]);

  return (
    <Modal size='small' isOpen={isOpen} close={closeModal}>
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
              Bio
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
                required: true,
                validate: (value) => value === watch(password.name),
              })}
            />
            <Error error={errors['check-password']} />
          </div>
        </div>
        <Button className='d-block w-100 mb-1' loading={createBlogResponse.isLoading}>
          {activeStep === 2 ? 'Ro`yxatdan o`tish' : 'Davom etish'}
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
    </Modal>
  );
};

function PasswordValidityLevel({ password }: IPasswordValidityLevelProps): JSX.Element {
  const [passedRequirements, setPassedRequirements] =
    useState<Record<Partial<TValidityRequirement>, boolean>>();

  useEffect(() => {
    setPassedRequirements({
      length: password?.length >= 8,
      upperLowerCase: /[A-ZА-Я]/.test(password) && /[a-zа-я]/.test(password),
      numberContains: /[0-9]/.test(password),
    });
  }, [password]);

  return (
    <div>
      {Object.keys(PASSWORD_VALIDITY_REQUIREMENTS).map((requirement) => {
        const text = PASSWORD_VALIDITY_REQUIREMENTS[requirement as TValidityRequirement];
        const isPassed = passedRequirements?.[requirement as TValidityRequirement];
        return (
          <div key={requirement} className={isPassed ? 'text-green' : ''}>
            <p className={classes['password-requirement']}>
              {isPassed ? <span>&#10003;</span> : <span>&#10005;</span>}&nbsp;
              {text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
