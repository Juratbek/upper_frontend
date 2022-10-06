import { Button, Error, Input, Label, Modal, TelegramLoginButton, Textarea } from 'components';
import { useAuth } from 'hooks';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetLabelsQuery, useRegisterMutation, useSetLabelsMutation } from 'store/apis';
import { closeRegisterModal, getIsRegisterModalOpen } from 'store/states/registerModal';
import { IResponseError, TSubmitFormEvent } from 'types';

import { REGISTER_FORM_FIELDS } from './RegisterModal.constants';
import classes from './RegisterModal.module.scss';

const { name, bio, login, password } = REGISTER_FORM_FIELDS;

export const RegisterModal: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);
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
  const { data: labels = [] } = useGetLabelsQuery();
  const [createBlog, createBlogResponse] = useRegisterMutation();
  const [setBlogLabels, setLabelsResponse] = useSetLabelsMutation();

  const closeModal = (): void => {
    dispatch(closeRegisterModal());
  };

  const incrementStep = (): void => {
    setActiveStep((prev) => prev + 1);
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
      authenticate(res.token);
      incrementStep();
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

  const labelHandler = useCallback(
    (labelId: number): void => {
      if (selectedLabels.includes(labelId)) {
        const filteredLabels = selectedLabels.filter((label) => label !== labelId);
        return setSelectedLabels(filteredLabels);
      }
      setSelectedLabels((labels) => [...labels, labelId]);
    },
    [selectedLabels],
  );

  const finishRegistering = async (): Promise<void> => {
    if (selectedLabels.length) await setBlogLabels(selectedLabels);
    closeModal();
  };

  useEffect(() => {
    if (activeStep === 2) {
      setFocus(login.name);
    }
  }, [activeStep]);

  const labelsContainer = useMemo(
    () => (
      <div className={classes.labels}>
        {labels.map((label) => (
          <Label
            key={label.id}
            onClick={(): void => labelHandler(label.id)}
            className='me-1 mb-1 pointer'
            color={selectedLabels.includes(label.id) ? 'dark' : 'outline-dark'}
          >
            {label.name}
          </Label>
        ))}
      </div>
    ),
    [labels, selectedLabels, labelHandler],
  );

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
            <Error error={errors[password.name]} />
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
        <div className={activeStep === 3 ? 'd-block' : 'd-none'}>
          <div className='form-element'>
            <label htmlFor='login' className='d-block mb-1'>
              Siz uchun qiziqarli sohalarni tanlashingiz mumkin
            </label>
            {labelsContainer}
          </div>
        </div>
        {activeStep === 3 ? (
          <Button
            type='button'
            className='d-block w-100 mb-1'
            loading={setLabelsResponse.isLoading}
            onClick={finishRegistering}
          >
            Yakunlash
          </Button>
        ) : (
          <Button className='d-block w-100 mb-1' loading={createBlogResponse.isLoading}>
            Davom etish
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
