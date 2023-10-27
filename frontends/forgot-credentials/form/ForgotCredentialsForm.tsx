import { Alert, ApiErrorBoundary, BlogSkeleton, Button, Error } from 'components';
import { Input } from 'components/form';
import { useTheme } from 'hooks';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useLazyBlogsGetByEmailQuery,
  useSendEmailConfirmationForPasswordMutation,
} from 'store/apis';
import { IBlogSmall } from 'types';
import { addAmazonUri } from 'utils';

import { BlogOption } from '../blog-option/BlogOption';
import classes from './ForgotCredentialsForm.module.scss';

export const ForgotCredentialsForm: FC = () => {
  const [alert, setAlert] = useState('');
  const { theme } = useTheme();
  const [sendEmailForPassword, sendEmailForPasswordRes] =
    useSendEmailConfirmationForPasswordMutation();
  const [getByEmail, getByEmailRes] = useLazyBlogsGetByEmailQuery();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const submitHandler = async (event: Record<string, string>): Promise<void> => {
    getByEmail(event.email);
  };

  const closeAlert = (): void => setAlert('');

  const selectBlogHandler = async (blog: IBlogSmall): Promise<void> => {
    const { id } = blog;
    await sendEmailForPassword({ id, email: watch('email') }).unwrap();
    setAlert("Elektron pochtangizga login va parolni o'zgartirish uchun havola (link) jo'natildi");
  };

  const form = (
    <form onSubmit={handleSubmit(submitHandler)}>
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

  const blogs = (
    <ApiErrorBoundary
      res={getByEmailRes}
      fallbackItemCount={2}
      fallback={<BlogSkeleton className='mb-2' />}
    >
      <h2 className='mt-0'>Profilingizni tanlang</h2>
      {getByEmailRes.data?.map((blog) => (
        <div
          key={blog.id}
          className={`${classes.option} ${classes[`option--${theme}`]}`}
          onClick={(): Promise<void> => selectBlogHandler(blog)}
        >
          <BlogOption {...addAmazonUri(blog)} />
        </div>
      ))}
    </ApiErrorBoundary>
  );

  return (
    <div className={classes.container}>
      {alert && (
        <Alert color='green' className='mb-1' onClose={closeAlert}>
          <p className='my-0'>{alert}</p>
        </Alert>
      )}
      {getByEmailRes.isUninitialized && form}
      {sendEmailForPasswordRes.isUninitialized && getByEmailRes.data?.length != 0 && blogs}
      {getByEmailRes.data?.length === 0 && (
        <h3 className='text-center'>
          Kechirasiz, biz ushbu e-pochta manzili bilan bog&apos;liq profillarni topa olmadik.
        </h3>
      )}
      {sendEmailForPasswordRes.isLoading && (
        <h3>
          Elektron pochtangizga havola jo&apos;natilmoqda <br />
          Iltimos kuting...
        </h3>
      )}
    </div>
  );
};
