import { useAuth } from 'hooks';
import Script from 'next/script';
import { FC, useEffect } from 'react';
import { useGoogleOneTapRegisterMutation } from 'store/apis';

import { ISignInResponse } from './GoogleOneTap.types';

export const GoogleOneTap: FC = () => {
  const [oneTapRegister, oneTapRegisterRes] = useGoogleOneTapRegisterMutation();
  const { authenticate, isAuthenticated } = useAuth();

  useEffect(() => {
    const { data, isSuccess } = oneTapRegisterRes;
    if (isSuccess) {
      authenticate(data.token);
    }
  }, [oneTapRegisterRes.data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isAuthenticated === false) {
        try {
          google.accounts.id.initialize({
            client_id: process.env.GOOGLE_CLIENT_ID,
            callback: function (res: ISignInResponse) {
              oneTapRegister(res.credential);
            },
          });
          google.accounts.id.prompt();
        } catch (e) {}
      }
    }, 1000);
    return () => window.clearTimeout(timeout);
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated === false && (
        <Script src='https://accounts.google.com/gsi/client' async defer></Script>
      )}
    </>
  );
};
