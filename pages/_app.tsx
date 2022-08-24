import 'Styles/index.scss';

import { Navigation, Sidebar } from 'components';
import { LoginModal } from 'components/LoginModal/LoginModal';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { wrapper } from 'store';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { session } = pageProps;

  return (
    <SessionProvider session={session}>
      <div className='app'>
        <Navigation />
        <LoginModal />
        <div className='main'>
          <Component {...pageProps} />
        </div>
        <Sidebar />
      </div>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
