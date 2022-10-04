import 'styles/index.scss';

import { Navigation, Sidebar } from 'components';
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
        <div className='main'>
          <Component {...pageProps} />
        </div>
        <Sidebar />
      </div>
      <NextNProgress color='#7a7e80' height={3} showOnShallow={true} />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
