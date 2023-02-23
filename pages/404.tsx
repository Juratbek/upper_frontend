import { Head } from 'components';
import { NotFound } from 'frontends/404';
import { useAuth } from 'hooks';
import { NextPage } from 'next';
import { useEffect } from 'react';

const NotFoundPage: NextPage = () => {
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
      <Head title='Sahifa topilmadi' url='/not-fount' />
      <NotFound />
    </div>
  );
};

export default NotFoundPage;
