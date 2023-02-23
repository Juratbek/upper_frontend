import { Head } from 'components';
import { LoginPage } from 'frontends/login';
import { useAuth } from 'hooks';
import { NextPage } from 'next';
import { useEffect } from 'react';

const LoginNextPage: NextPage = () => {
  const { getToken, getRefreshToken, authenticate } = useAuth();

  useEffect(() => {
    const token = getToken();
    const refreshToken = getRefreshToken() || '';
    if (token) {
      authenticate({ token, refreshToken });
    }
  }, []);

  return (
    <div>
      <Head title='Login' url='/login' />
      <LoginPage />
    </div>
  );
};

export default LoginNextPage;
