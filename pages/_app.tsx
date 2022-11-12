import 'styles/index.scss';

import { GoogleOneTap, Navigation, Sidebar } from 'components';
import { useAuth } from 'hooks';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useMemo } from 'react';
import { wrapper } from 'store';
import { appDynamic } from 'utils';
import { getDevice } from 'utils';

const DynamicLoginModal = appDynamic(() => import('components/LoginModal'));

const DynamicRegisterModal = appDynamic(() => import('components/RegisterModal'));

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const isMobile = useMemo(() => getDevice().isMobile, []);
  const { getToken, getRefreshToken, authenticate, unauthenticate } = useAuth();

  useEffect(() => {
    const token = getToken();
    const refreshToken = getRefreshToken() || '';
    if (token) {
      authenticate({ token, refreshToken });
    } else {
      unauthenticate();
    }
  }, []);

  return (
    <div>
      <div className='app'>
        <Navigation />
        <DynamicLoginModal />
        <DynamicRegisterModal />
        <main className='main'>
          <Component {...pageProps} />
        </main>
        <Sidebar />
      </div>
      <NextNProgress color='#7a7e80' height={3} showOnShallow={true} />
      <GoogleOneTap />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
