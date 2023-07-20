import { EditorSpinner } from 'components';
import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from 'store';
import { openAuthModal } from 'store/states';

export const LoginPage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    query: { redirect, message },
    push,
  } = useRouter();
  const { authenticateTokens, getToken, getRefreshToken, unauthenticate } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getToken();
    const refreshToken = getRefreshToken() || '';
    if (token) {
      authenticateTokens({ token, refreshToken });
      typeof redirect === 'string' ? push(redirect) : push('/');
    } else {
      unauthenticate();
      setIsLoading(false);
      dispatch(openAuthModal(message as string));
    }
  }, []);

  if (isLoading)
    return (
      <div className='position-relative'>
        <EditorSpinner />
      </div>
    );

  return <div />;
};
