import 'styles/index.scss';

import { Footer, GoogleOneTap, Navigation, Sidebar } from 'components';
import { useAuth } from 'hooks';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import { wrapper } from 'store';
import { appDynamic } from 'utils';

const DynamicLoginModal = appDynamic(() => import('components/LoginModal'));

const DynamicRegisterModal = appDynamic(() => import('components/RegisterModal'));

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
      <Head>
        <meta name='description' content='Biz bilan yanada yuqoriroq' key='description' />
        <meta property='og:title' content='UPPER' key='og-title' />
        <title key='title'>UPPER</title>
      </Head>
      <div className='app'>
        <Navigation />
        <DynamicLoginModal />
        <DynamicRegisterModal />
        <main className='main'>
          <Component {...pageProps} />
          <Footer />
        </main>
        <Sidebar />
      </div>
      <NextNProgress color='#7a7e80' height={3} showOnShallow={true} />
      <GoogleOneTap />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
