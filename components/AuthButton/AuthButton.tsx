import { useAuth } from 'hooks';
import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch } from 'store';
import { IBlogRegisterResponse } from 'store/apis';
import { closeAuthModal } from 'store/states';

import { TRUSTED_ORIGINS } from './AuthButton.constants';
import { IAuthButtonProps } from './AuthButton.types';

export const AuthButton: FC<IAuthButtonProps> = ({ type = 'signIn', ...props }) => {
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

  const src = useMemo(() => {
    let src = `https://access.upper.uz/btn?origin=https://upper.uz&type=${type}`;

    if (props.width) {
      src += `&width=${props.width}`;
    }

    return src;
  }, [props.width]);

  return <iframe src={src} width={150} height={35} style={{ border: 0 }} {...props}></iframe>;
};
