import 'styles/index.scss';

import { GoogleOneTap, Navigation, Sidebar } from 'components';
import { LoginModal, RegisterModal } from 'components';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { wrapper } from 'store';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div>
      <div className='app'>
        <Navigation />
        <LoginModal />
        <RegisterModal />
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
