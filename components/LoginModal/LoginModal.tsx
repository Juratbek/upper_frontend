import { Button, Error, Input, Modal, TelegramLoginButton } from 'components';
import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';
import { useLoginMutation } from 'store/apis';
import { closeLoginModal, getIsModalOpen, openRegisterModal } from 'store/states';
import { TSubmitFormEvent } from 'types';
import { signIn, telegramSignIn } from 'utils';

import { LOGIN_FORM_FIELDS } from './LoginModal.constants';

const { login, password } = LOGIN_FORM_FIELDS;

export const LoginModal: FC = () => {
  const isOpen = useAppSelector(getIsModalOpen);
  const dispatch = useAppDispatch();
  const [loginBlog, loginBlogResponse] = useLoginMutation();
  const { status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const closeModal = (): void => {
    dispatch(closeLoginModal());
  };

  const registerUser = (): void => {
    dispatch(openRegisterModal());
    closeModal();
  };

  const submitHandler = async (event: TSubmitFormEvent): Promise<void> => {
    const { login, password } = event;
    try {
      const res = await loginBlog({ username: login, password }).unwrap();
      await signIn({
        token: res.token,
        name: res.name,
        email: res.email,
        image: res.image,
      });
    } catch (e) {
      console.error(e);
    }
    closeModal();
  };

  return (
    <Modal size='small' isOpen={isOpen} close={closeModal}>
      <form onSubmit={handleSubmit(submitHandler)}>
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
          <Input type='password' id='password' {...register(password.name, password.options)} />
          <Error error={errors[password.name]} />
        </div>
        <Button
          className='d-block w-100 mb-1'
          loading={
            loginBlogResponse.isLoading ||
            (loginBlogResponse.isSuccess && status !== 'authenticated')
          }
        >
          Kirish
        </Button>
        <Button className='d-block w-100' color='outline-dark' type='button' onClick={registerUser}>
          Ro`yxatdan o`tish
        </Button>
        <TelegramLoginButton
          className='mt-2 text-center'
          botName='udas_bot'
          onAuth={telegramSignIn}
        />
      </form>
    </Modal>
  );
};
