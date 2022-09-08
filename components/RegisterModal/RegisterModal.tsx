import { Button, Error, Input, Label, Modal, Textarea } from 'components';
import { signIn, useSession } from 'next-auth/react';
import { FC, useCallback, useMemo, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { useGetLabelsQuery, useRegisterMutation, useSetLabelsMutation } from 'store/apis';
import { closeRegisterModal, getIsRegisterModalOpen } from 'store/states/registerModal';
import { IResponseError } from 'types';

import classes from './RegisterModal.module.scss';

export const RegisterModal: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);
  const isOpen = useAppSelector(getIsRegisterModalOpen);
  const dispatch = useAppDispatch();
  const { status: authStatus } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();
  const { data: labels = [] } = useGetLabelsQuery('');
  const [createBlog, createBlogResponse] = useRegisterMutation();
  const [setBlogLabels, setLabelsResponse] = useSetLabelsMutation();

  const closeModal = (): void => {
    dispatch(closeRegisterModal());
  };

  const incrementStep = (): void => {
    setActiveStep((prev) => prev + 1);
  };

  const submitHandler = async (event: Record<string, string>): Promise<void> => {
    const { name, bio, login, password } = event;
    try {
      const res = await createBlog({
        name,
        description: bio,
        username: login,
        password,
      }).unwrap();
      await signIn('credentials', {
        token: res.token,
        name: res.name,
        email: res.email,
        image: res.image,
        redirect: false,
      });
      incrementStep();
    } catch (e) {
      const error = e as IResponseError;
      console.error(error);
      if (error.status === 409) {
        setError('login', { type: 'value', message: error.data.message }, { shouldFocus: true });
      }
    }
  };

  const errorHandler = (e: FieldErrors): void => {
    if (activeStep === 1) {
      if (!('name' in e || 'bio' in e)) {
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
            <Input id='name' {...register('name', { required: true })} />
            <Error error={errors['name']} />
          </div>
          <div className='form-element'>
            <label htmlFor='bio' className='d-block mb-1'>
              Bio
            </label>
            <Textarea id='bio' {...register('bio', { required: true })} />
            <Error error={errors['bio']} />
          </div>
        </div>
        <div className={activeStep === 2 ? 'd-block' : 'd-none'}>
          <div className='form-element'>
            <label htmlFor='login' className='d-block mb-1'>
              Loginni kiriting
            </label>
            <Input id='login' {...register('login', { required: true })} />
            <Error error={errors.login} />
          </div>
          <div className='form-element'>
            <label htmlFor='password' className='d-block mb-1'>
              Parolni kiriting
            </label>
            <Input id='password' type='password' {...register('password', { required: true })} />
            <Error error={errors.password} />
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
                validate: (value) => value === watch('password'),
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
          <Button
            className='d-block w-100 mb-1'
            loading={
              createBlogResponse.isLoading ||
              (createBlogResponse.isSuccess && authStatus !== 'authenticated')
            }
          >
            Davom etish
          </Button>
        )}
      </form>
    </Modal>
  );
};
