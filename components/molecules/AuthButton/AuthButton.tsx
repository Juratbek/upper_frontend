import { Button } from 'components/lib';
import { useAuth } from 'hooks';
import { IRegisterResponse } from 'hooks/useAuth';
import { FC, ReactNode, useEffect } from 'react';
import { useAppDispatch } from 'store';
import { closeAuthModal } from 'store/states';

import { TRUSTED_ORIGINS } from './AuthButton.constants';

export const AuthButton: FC<{ children: ReactNode }> = ({ children }) => {
  const { authenticate, openLoginPage } = useAuth();
  const dispatch = useAppDispatch();

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
