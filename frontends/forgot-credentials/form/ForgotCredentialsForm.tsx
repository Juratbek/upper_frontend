import { Alert, Button, Error, Input } from 'components';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSendEmailConfirmationForPasswordMutation } from 'store/apis';

import classes from './ForgotCredentialsForm.module.scss';

export const ForgotCredentialsForm: FC = () => {
  const [alert, setAlert] = useState('');
  const [sendEmailForPassword, sendEmailForPasswordRes] =
    useSendEmailConfirmationForPasswordMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async (event: Record<string, string>): Promise<void> => {
    await sendEmailForPassword(event.email);
    setAlert("Elektron pochtangizga havola jo'natildi");
  };

  const closeAlert = (): void => {
    setAlert('');
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      {alert && (
        <Alert color='green' className='mb-1' onClose={closeAlert}>
          <p className='mt-0'>{alert}</p>
          <a href='https://gmail.com' target='_blank' rel='noreferrer'>
            <Button color='outline-white' type='button'>
              Elektron pochtani ochish
            </Button>
          </a>
        </Alert>
      )}
      <div className='mb-2'>
        <label htmlFor='email' className='mb-1 d-block'>
          Elektron pochatangizni kiriting
        </label>
        <Input
          placeholder='pochta@mail.com'
          type='email'
          {...register('email', { required: 'Elektron pochtangizni kiriting' })}
        />
        <Error error={errors.email} />
      </div>
      <Button className='w-100' loading={sendEmailForPasswordRes.isLoading}>
        Havola jo&apos;natish
      </Button>
      <p className='text-gray'>
        Elektron pochtangizga parolni o&apos;zgartirish uchun havola jo&apos;natiladi
      </p>
    </form>
  );
};
