import {
  Alert,
  Button,
  Error,
  Input,
  PasswordValidityLevel,
  REGISTER_FORM_FIELDS,
} from 'components';
import { useAuth } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChangeCredentialsMutation } from 'store/apis';
import { IResponseError } from 'types';

export const ChangeCredentialsForm: FC = () => {
  const [isTokenAbsent, setIsTokenAbsent] = useState(false);
  const [alert, setAlert] = useState('');
  const [changeCredentials] = useChangeCredentialsMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const {
    query: { token },
    push,
  } = useRouter();
  const { authenticate } = useAuth();

  const submitHandler = async (event: Record<string, string>): Promise<void> => {
    try {
      if (typeof token !== 'string') return Promise.reject();
      const { login, password } = event;
      const res = await changeCredentials({ username: login, password, token }).unwrap();
      authenticate(res);
      push('/');
    } catch (e) {
      const exception = e as IResponseError;
      setAlert(exception.data.message);
    }
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      !token && setIsTokenAbsent(true);
    }, 2000);
    return () => window.clearTimeout(timeout);
  }, []);

  const form = useMemo(() => {
    if (!token && isTokenAbsent) return <div>Token xato</div>;

    return (
      <>
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
            Parolni qayta kiriting
          </label>
          <Input
            type='password'
            {...register('confirmPassword', { required: 'Parolni takrorlang' })}
          />
          <Error error={errors.password} />
        </div>
        <Button className='w-100'>Saqlash</Button>
      </>
    );
  }, [token, isTokenAbsent, watch('password')]);

  const closeAlert = (): void => {
    setAlert('');
  };

  return (
    <form className='form' onSubmit={handleSubmit(submitHandler)}>
      {alert && (
        <Alert color='red' className='mb-1 text-center' onClose={closeAlert}>
          {alert}
          <Link href='/forgot-credentials'>
            <a>
              <Button type='button' className='mt-1' color='outline-white'>
                Yangi token olish
              </Button>
            </a>
          </Link>
        </Alert>
      )}
      {form}
    </form>
  );
};
