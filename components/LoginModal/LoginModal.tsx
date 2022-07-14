import { Button, Input } from 'components';
import { FC } from 'react';
import { useAppSelector } from 'store';
import { getIsModalOpen } from 'store/loginModal';
import { ICON_TYPES, ICONS } from 'variables';

import classes from './LoginModal.module.scss';

const TelegramIcon = ICONS[ICON_TYPES.telegram];
const GoogleIcon = ICONS[ICON_TYPES.google];

export const LoginModal: FC = () => {
  const isOpen = useAppSelector(getIsModalOpen);

  const googleClickHandler = (): void => {
    // google login
  };

  return (
    <div className={`modal ${isOpen && 'modal--open'}`}>
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
            <Button
              type='button'
              color='light'
              data-onsuccess='onSignIn'
              className={classes['social-media-icon']}
            >
              <TelegramIcon />
            </Button>
            <Button
              type='button'
              color='light'
              onClick={googleClickHandler}
              className={classes['social-media-icon']}
            >
              <GoogleIcon />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
