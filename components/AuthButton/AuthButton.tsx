import { useAuth } from 'hooks';
import { FC, useEffect } from 'react';
import { IBlogRegisterResponse } from 'store/apis';

import { TRUSTED_ORIGINS } from './AuthButton.constants';
import { IAuthButtonProps } from './AuthButton.types';

export const AuthButton: FC<IAuthButtonProps> = ({ type = 'signIn', ...props }) => {
  const { authenticate } = useAuth();

  useEffect(() => {
    const listener = (event: MessageEvent<IBlogRegisterResponse>): void => {
      if (TRUSTED_ORIGINS.includes(event.origin) && event.data?.token) {
        authenticate(event.data);
      }
    };

    window.addEventListener('message', listener);

    return () => window.removeEventListener('message', listener);
  }, []);

  return (
    <iframe
      src={`http://localhost:3000/btn?origin=http://localhost:3001&type=${type}`}
      width={150}
      height={35}
      style={{ border: 0 }}
      {...props}
    ></iframe>
  );
};
