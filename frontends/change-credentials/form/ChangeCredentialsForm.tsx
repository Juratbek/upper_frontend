import { PasswordValidityLevel } from 'components';
import { Input } from 'components/form';
import { Alert, Button, Error } from 'components/lib';
import { useAuth } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChangeCredentialsMutation } from 'store/apis';
import { IResponseError } from 'types';
import { WEB_APP_ROOT_DIR } from 'variables';

export const ChangeCredentialsForm: FC = () => {
  const [isTokenAbsent, setIsTokenAbsent] = useState(false);
  const [alert, setAlert] = useState<{ message: string; code: number } | undefined>();
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
      setAlert(undefined);
      const { login, password } = event;
      const res = await changeCredentials({ username: login, password, token }).unwrap();
      authenticate(res);
      push('/');
    } catch (e) {
      const exception = e as IResponseError;
      setAlert({ message: exception.data.message, code: exception.status });
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
          <Input {...register('login')} />
          {/* <UsernameValidityError
            value={watch(login.name)}
            show={Boolean(errors[login.name])}
            error={errors[login.name]}
          /> */}
        </div>
        <div className='mb-2'>
          <label htmlFor='passowrd' className='mb-1 d-block'>
            Parol
          </label>
          <Input type='password' {...register('password')} />
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
  }, [token, isTokenAbsent, watch('password'), errors]);

  const closeAlert = (): void => {
    setAlert(undefined);
  };

  return (
    <form className='form' onSubmit={handleSubmit(submitHandler)}>
      <Alert color='red' show={Boolean(alert)} className='mb-1 text-center' onClose={closeAlert}>
        {alert?.message}
        {alert?.code && [401, 403].includes(alert.code) && (
          <Link href={`${WEB_APP_ROOT_DIR}/forgot-credentials`}>
            <Button type='button' className='mt-1'>
              Yangi token olish
            </Button>
          </Link>
        )}
      </Alert>
      {form}
    </form>
  );
};
