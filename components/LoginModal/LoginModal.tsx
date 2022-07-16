import { Button, Input } from 'components';
import { signIn } from 'next-auth/react';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { getIsModalOpen } from 'store/loginModal';
import { close } from 'store/loginModal/loginModalSlice';
import { ICONS } from 'variables';

import { AUTH_TYPES, SOCIAL_MEDIA_LOGIN_OPTIONS } from './LoginModal.constants';
import classes from './LoginModal.module.scss';
import { ISocialMediaLoginOption } from './LoginModal.types';

export const LoginModal: FC = () => {
  const isOpen = useAppSelector(getIsModalOpen);
  const dispatch = useAppDispatch();

  const mediaIconClickHandler = (option: ISocialMediaLoginOption): void => {
    if (option.type === AUTH_TYPES.nextAuth) {
      // debugger;
      signIn(option.id);
    } else if (option.type === AUTH_TYPES.telegram) {
      console.log('login with telegram');
    }
  };

  const closeModal = (): void => {
    dispatch(close());
  };

  return (
    <div className={`modal ${isOpen && 'modal--open'}`}>
      <div className='modal-bg' onClick={closeModal} />
      <div className='modal-dialog'>
        <form className='modal-body'>
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
            {SOCIAL_MEDIA_LOGIN_OPTIONS.map((option, index) => {
              const MediaIcon = ICONS[option.icon];
              return (
                <div key={index} className={classes['social-media']}>
                  <Button
                    type='button'
                    color='light'
                    onClick={(): void => mediaIconClickHandler(option)}
                    className={classes['social-media-icon']}
                  >
                    <MediaIcon />
                  </Button>
                  <div>{option.label}</div>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
};
