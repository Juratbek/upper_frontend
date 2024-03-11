import { Button } from 'components/lib';
import { IRegisterResponse, useAuth } from 'hooks';
import { FC, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeAuthModal } from 'store/states';

import { TRUSTED_ORIGINS } from './AuthButton.constants';

export const AuthButton: FC<{ children: ReactNode }> = ({ children }) => {
  const { authenticate, openLoginPage } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = (event: MessageEvent<IRegisterResponse>): void => {
      if (TRUSTED_ORIGINS.includes(event.origin) && event.data?.token) {
        authenticate(event.data);
        dispatch(closeAuthModal());
      }
    };

    window.addEventListener('message', listener);

    return () => window.removeEventListener('message', listener);
  }, []);

  const loginClickHandler = (): void => openLoginPage();

  return <Button onClick={loginClickHandler}>{children}</Button>;
};
