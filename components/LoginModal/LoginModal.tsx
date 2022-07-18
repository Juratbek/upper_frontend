import { Button, Input, Modal, TelegramLoginButton } from 'components';
import { signIn } from 'next-auth/react';
import { getProviders } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { close, getIsModalOpen } from 'store/loginModal';
import { TAuthProviders } from 'types';
import { telegramSignIn } from 'utils';
import { ICONS } from 'variables';

import classes from './LoginModal.module.scss';

export const LoginModal: FC = () => {
  const [providers, setProviders] = useState<TAuthProviders | null>();
  const isOpen = useAppSelector(getIsModalOpen);
  const dispatch = useAppDispatch();

  const closeModal = (): void => {
    dispatch(close());
  };

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <form>
        <div className='form-element'>
          <label htmlFor='login' className='d-block mb-1'>
            Loginni kiriting
          </label>
          <Input name='login' id='login' />
        </div>
        <div className='form-element'>
          <label htmlFor='password' className='d-block mb-1'>
            Parolni kiriting
          </label>
          <Input type='password' id='password' name='password' />
        </div>
        <Button className='d-block w-100 mb-1'>Kirish</Button>
        <Button className='d-block w-100' color='outline-dark'>
          Ro`yxatdan o`tish
        </Button>
        <div className='d-flex justify-content-around mt-1'>
          {providers &&
            Object.values(providers).map((provider, index) => {
              const MediaIcon = ICONS[provider.id];
              return (
                <div key={index} className={classes['social-media']}>
                  <Button
                    type='button'
                    color='light'
                    onClick={(): void => {
                      signIn(provider.id);
                    }}
                    className={classes['social-media-icon']}
                  >
                    <MediaIcon />
                  </Button>
                  <div>{provider.name}</div>
                </div>
              );
            })}
        </div>
        <TelegramLoginButton
          className='mt-2 text-center'
          botName='udas_bot'
          onAuth={telegramSignIn}
        />
      </form>
    </Modal>
  );
};
