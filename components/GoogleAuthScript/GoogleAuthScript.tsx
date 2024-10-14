import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useContinueWithGoogle } from 'store/clients/blog';
import { closeAuthModal } from 'store/states';

import { IGoogleSignInRes } from './GoogleAuthScript.types';

export const GoogleAuthScript: FC = () => {
  const dispatch = useDispatch();
  const { authenticate, isAuthenticated } = useAuth();
  const { mutate: continueWithGoogle } = useContinueWithGoogle({
    onMutate: () => toast.loading('Yuklanmoqda...'),
    onSuccess: (res) => {
      authenticate(res);
      dispatch(closeAuthModal());
      toast.dismiss();
    },
    onError: () => {
      toast.dismiss();
      toast.error("Xatolik tuz berdi, birozdan keyin urinib ko'ring");
    },
  });
  const {
    query: { code },
  } = useRouter();

  const callback = async (googleResponse: IGoogleSignInRes): Promise<void> => {
    continueWithGoogle(googleResponse.credential);
  };

  const onLoadHandler = (): void => {
    if (code) return;
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback,
      cancel_on_tap_outside: false,
    });
    google.accounts.id.prompt();
  };

  return isAuthenticated === false ? (
    <Script src='https://accounts.google.com/gsi/client' async onLoad={onLoadHandler} defer />
  ) : (
    <></>
  );
};
