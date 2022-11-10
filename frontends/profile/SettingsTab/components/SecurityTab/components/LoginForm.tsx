import { Alert, Button, Error, Input, TAlertColor } from 'components';
import { useAuth } from 'hooks';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChangeLoginMutation } from 'store/apis';
import { IResponseError } from 'types';

export const LoginForm: FC = () => {
  const [changeLogin, changeLoginRes] = useChangeLoginMutation();
  const [alert, setAlert] = useState<{ message: string; color: TAlertColor }>();
  const { authenticate } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = (event: Record<string, string>): void => {
    const { login, password } = event;
    changeLogin({ username: login, password });
  };

  useEffect(() => {
    const { data, isSuccess, isError, error } = changeLoginRes;
    if (isSuccess) {
      authenticate(data);
      setAlert({ message: 'Login o`zgartirildi', color: 'green' });
    }
    const apiError = error as IResponseError;
    isError && setAlert({ message: apiError.data.message, color: 'red' });
  }, [changeLoginRes.status]);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {alert && (
        <Alert color={alert.color} className='mb-1' onClose={(): void => setAlert(undefined)}>
          {alert.message}
        </Alert>
      )}
      <h3>Loginni o`zgartirish</h3>
      <div className='mb-1'>
        <label className='mb-1 d-block' htmlFor='newLogin'>
          Yangi Login
        </label>
        <Input {...register('login', { required: 'Loginni kiriting' })} />
        <Error error={errors.newLogin} />
      </div>
      <div className='mb-1'>
        <label className='mb-1 d-block' htmlFor='password'>
          Parol
        </label>
        <Input type='password' {...register('password', { required: 'Parolni kiriting' })} />
        <Error error={errors.password} />
      </div>
      <Button color='outline-dark' loading={changeLoginRes.isLoading}>
        O`zgartirish
      </Button>
    </form>
  );
};
