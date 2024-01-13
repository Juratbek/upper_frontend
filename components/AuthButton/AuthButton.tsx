import { Button } from 'components/lib';
import { useAuth } from 'hooks';
import { FC, useEffect } from 'react';
import { useAppDispatch } from 'store';
import { IBlogRegisterResponse } from 'store/apis';
import { closeAuthModal } from 'store/states';
import { ACCESS_UPPER_UZ } from 'variables';

import { TRUSTED_ORIGINS } from './AuthButton.constants';

export const AuthButton: FC = () => {
  const { authenticate } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = (event: MessageEvent<IBlogRegisterResponse>): void => {
      if (TRUSTED_ORIGINS.includes(event.origin) && event.data?.token) {
        authenticate(event.data);
        dispatch(closeAuthModal());
      }
    };

    window.addEventListener('message', listener);

    return () => window.removeEventListener('message', listener);
  }, []);

  const loginClickHandler = (): void => {
    window.open(ACCESS_UPPER_UZ, '_blank');
  };

  return <Button onClick={loginClickHandler}>Kirish</Button>;
};
