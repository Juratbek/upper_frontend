import 'styles/index.scss';

import { AppSuspense, GoogleOneTap, Navigation, Sidebar } from 'components';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { wrapper } from 'store';
import { appDynamic } from 'utils';

const DynamicLoginModal = appDynamic('components/LoginModal');

const DynamicRegisterModal = appDynamic('components/RegisterModal');

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div>
      <div className='app'>
        <Navigation />
        <AppSuspense>
          <DynamicLoginModal />
          <DynamicRegisterModal />
        </AppSuspense>
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
