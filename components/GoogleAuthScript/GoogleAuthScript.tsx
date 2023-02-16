import { useAuth } from 'hooks';
import Script from 'next/script';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useContinueWithGoogleMutation } from 'store/apis';
import { closeLoginModal, closeRegisterModal, setIsGoogleScriptLoaded } from 'store/states';

import { IGoogleSignInRes } from './GoogleAuthScript.types';

export const GoogleAuthScript: FC = () => {
  const [continueWithGoogle] = useContinueWithGoogleMutation();
  const dispatch = useDispatch();
  const { authenticate } = useAuth();

  const callback = async (googleResponse: IGoogleSignInRes): Promise<void> => {
    const res = await continueWithGoogle(googleResponse.credential).unwrap();
    authenticate(res);
    dispatch(closeLoginModal());
    dispatch(closeRegisterModal());
  };

  const onLoadHandler = (): void => {
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback,
    });
    google.accounts.id.prompt();
    dispatch(setIsGoogleScriptLoaded(true));
  };

  return <Script src='https://accounts.google.com/gsi/client' async onLoad={onLoadHandler} defer />;
};
