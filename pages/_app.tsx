import 'Styles/index.scss';

import { Navigation, Sidebar } from 'components';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'store';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <div className='app'>
        <Navigation />
        <div className='main'>
          <Component {...pageProps} />
        </div>
        <Sidebar />
      </div>
    </Provider>
  );
}

export default MyApp;
