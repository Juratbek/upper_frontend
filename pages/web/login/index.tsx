import { Head } from 'components';
import { LoginPage } from 'frontends/login';
import { useAuth } from 'hooks';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useLazyGetCurrentBlogQuery } from 'store/apis';

const LoginNextPage: NextPage = () => {
  const { getToken, getRefreshToken, authenticateTokens, setCurrentBlog } = useAuth();
  const [fetchCurrentBlog] = useLazyGetCurrentBlogQuery();

  useEffect(() => {
    const token = getToken();
    const refreshToken = getRefreshToken() || '';
    if (token) {
      authenticateTokens({ token, refreshToken });
      fetchCurrentBlog().unwrap().then(setCurrentBlog);
    }
  }, []);

  return (
    <div>
      <Head title='Login' url='/web/login' />
      <LoginPage />
    </div>
  );
};

export default LoginNextPage;
