import { Button, Error, Input } from 'components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useSendEmailConfirmationForPasswordMutation } from 'store/apis';

import classes from './ForgotPasswordForm.module.scss';

export const ForgotCredentialsForm: FC = () => {
  const [sendEmailForPassword] = useSendEmailConfirmationForPasswordMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = (event: Record<string, string>): void => {
    sendEmailForPassword(event.email);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
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
      <Button className='w-100'>Havola jo`natish</Button>
      <p className='text-gray'>
        Elektron pochtangizga parolni o`zgartirish uchun havola jo`natiladi
      </p>
    </form>
  );
};
