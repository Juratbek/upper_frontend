import '../styles/index.css';

import { Navigation, Sidebar } from 'components';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className='app'>
      <Navigation />
      <div className='main'>
        <Component {...pageProps} />
      </div>
      <Sidebar />
    </div>
  );
}

export default MyApp;
