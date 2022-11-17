import { Button, Error, Input, PasswordValidityLevel } from 'components';
import { REGISTER_FORM_FIELDS } from 'components/RegisterModal/RegisterModal.constants';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import classes from './ChangeCredentialsForm.module.scss';

export const ChangeCredentialsForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const submitHandler = (event: Record<string, string>): void => {
    console.log('🚀 ~ file: ChangeCredentialsForm.tsx ~ line 15 ~ submitHandler ~ event', event);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <div className='mb-2'>
        <label htmlFor='login' className='mb-1 d-block'>
          Login
        </label>
        <Input {...register('login', REGISTER_FORM_FIELDS.login.options)} />
        <Error error={errors.login} />
      </div>
      <div className='mb-2'>
        <label htmlFor='passowrd' className='mb-1 d-block'>
          Parol
        </label>
        <Input type='password' {...register('password', REGISTER_FORM_FIELDS.password.options)} />
        <PasswordValidityLevel password={watch('password')} />
      </div>
      <div className='mb-2'>
        <label htmlFor='cofirm password' className='mb-1 d-block'>
          Parolni qaytaring
        </label>
        <Input
          type='password'
          {...register('confirmPassword', { required: 'Parolni takrorlang' })}
        />
        <Error error={errors.password} />
      </div>
      <Button className='w-100'>Saqlash</Button>
    </form>
  );
};
