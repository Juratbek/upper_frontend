import '../styles/index.css';

import type { AppProps } from 'next/app';

import { Navigation, Sidebar } from './components';

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
