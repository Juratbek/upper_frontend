import 'styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleAuthScript } from 'components';
import { Footer } from 'components/organisms';
import { UPPER_BLUE_COLOR } from 'constants/colors';
import { PRODUCTION_HOST } from 'constants/common';
import { ThemeProvider } from 'context';
import { getCookie } from 'cookies-next';
import { useAuth, useConsoleAnalytics } from 'hooks';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
import NextNProgress from 'nextjs-progressbar';
import { useCallback, useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from 'store';
import { queryClientDefaultOptions } from 'store/config/query-client';
import { IResponseError, IServerSideContext, TTheme } from 'types';

const DynamicAuthModal = dynamic(() => import('components/organisms/auth-modal'), { ssr: false });

function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;
  const { getToken, getRefreshToken, authenticateTokens, unauthenticate, syncTokens } = useAuth();
  useConsoleAnalytics();

  useEffect(() => {
    const token = getToken();
    const refreshToken = getRefreshToken() || '';
    if (token) {
      authenticateTokens({ token, refreshToken });
      syncTokens();
    } else {
      unauthenticate();
    }
  }, []);

  return (
    <div>
      <Head>
        <meta property='og:title' content='UPPER' key='og-title' />
        <title key='title'>UPPER</title>
      </Head>
      {typeof window === 'object' && window.location.host === PRODUCTION_HOST && (
        <>
          <Script
            strategy='afterInteractive'
            src='https://www.googletagmanager.com/gtag/js?id=G-6XYX2X34TV'
          />
          <Script
            id='google-analytics'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-6XYX2X34TV');
            `,
            }}
          />
        </>
      )}
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <DynamicAuthModal />
        <GoogleAuthScript />
        <Component {...pageProps} />
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
      </div>
      <NextNProgress color={UPPER_BLUE_COLOR} height={3} options={{ showSpinner: false }} />
    </div>
  );
}

interface IAppWithProviderProps extends AppProps {
  theme: TTheme;
}

const AppWithThemeAndQueryProvider = ({ theme, ...props }: IAppWithProviderProps): JSX.Element => {
  const { unauthenticate } = useAuth();

  const errorHandler = useCallback((e: Error) => {
    const error = e as unknown as IResponseError;
    if (error.status === 401) {
      unauthenticate();
    }
  }, []);

  const queryCache = new QueryCache({
    onError: errorHandler,
  });

  const mutationCache = new MutationCache({
    onError: errorHandler,
  });

  const queryClient = new QueryClient({
    defaultOptions: queryClientDefaultOptions,
    queryCache,
    mutationCache,
  });

  return (
    <ThemeProvider defaultTheme={theme}>
      <QueryClientProvider client={queryClient}>
        <MyApp {...props} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const AppWithReduxProvider = (props: IAppWithProviderProps) => (
  <Provider store={store}>
    <AppWithThemeAndQueryProvider {...props} />
  </Provider>
);

AppWithReduxProvider.getInitialProps = async (context: {
  ctx: IServerSideContext;
}): Promise<{ theme: TTheme }> => {
  const { req, res } = context.ctx;
  const theme = (getCookie('theme', { req, res }) || 'light') as TTheme;

  return { theme };
};

export default AppWithReduxProvider;
