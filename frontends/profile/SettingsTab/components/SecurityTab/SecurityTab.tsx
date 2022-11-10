import { Alert, Button, Error, Input } from 'components';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChangePasswordMutation } from 'store/apis';
import { IResponseError, TSubmitFormEvent } from 'types';

import { LoginForm } from './components';

const passwordMinLength = 8;

export const SecurityTab: FC = () => {
  const [alert, setAlert] = useState<string>();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [changePassword, changePasswordRes] = useChangePasswordMutation();

  const submitHandler = async (event: TSubmitFormEvent): Promise<void> => {
    const { currentPassword, newPassword } = event;
    changePassword({ currentPassword, newPassword });
  };

  useEffect(() => {
    const { isSuccess, isError, error } = changePasswordRes;
    if (isSuccess) {
      reset();
      setAlert('');
    }
    if (isError) {
      const err = error as IResponseError;
      setAlert(err.data.message);
    }
  }, [changePasswordRes]);

  const passwordForm = (
    <form onSubmit={handleSubmit(submitHandler)} autoComplete='off'>
      {alert && (
        <Alert color='red' className='mb-1'>
          {alert}
        </Alert>
      )}
      <div className='mb-1'>
        <label className='mb-1 d-block' htmlFor='username'>
          Joriy parol
        </label>
        <Input
          type='password'
          {...register('currentPassword', { required: true, minLength: passwordMinLength })}
        />
        <Error error={errors.currentPassword} />
      </div>
      <div className='mb-1'>
        <label className='mb-1 d-block' htmlFor='username'>
          Yangi parol
        </label>
        <Input
          type='password'
          {...register('newPassword', { required: true, minLength: passwordMinLength })}
        />
        <Error error={errors.newPassword} />
      </div>
      <div className='mb-1'>
        <label className='mb-1 d-block' htmlFor='username'>
          Yangi parolni takrorlang
        </label>
        <Input
          type='password'
          {...register('confirm-password', {
            required: true,
            validate: (value) => value === watch('newPassword'),
          })}
        />
        <Error error={errors['confirm-password']} message='Parollar mos kelmadi' />
      </div>
      <Button color='outline-dark' loading={changePasswordRes.isLoading}>
        O`zgartirish
      </Button>
    </form>
  );

  return (
    <div>
      <LoginForm />
      <div>
        <h3>Parolni o`zgartirish</h3>
        <div>{passwordForm}</div>
      </div>
    </div>
  );
};
