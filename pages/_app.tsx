import 'Styles/index.scss';

import { Navigation, Sidebar } from 'components';
import { LoginModal } from 'components/LoginModal/LoginModal';
import type { AppProps } from 'next/app';
import { wrapper } from 'store';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className='app'>
      <Navigation />
      <LoginModal />
      <div className='main'>
        <Component {...pageProps} />
      </div>
      <Sidebar />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
