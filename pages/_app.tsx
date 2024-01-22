import 'styles/index.scss';

import { GoogleAuthScript } from 'components';
import { Footer } from 'components/organisms';
import { ThemeProvider } from 'context';
import { getCookie } from 'cookies-next';
import { useAuth, useTheme } from 'hooks';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { wrapper } from 'store';
import { queryClient } from 'store/config';
import { IServerSideContext, TTheme } from 'types';
import { PRODUCTION_HOST, WEB_APP_ROOT_DIR } from 'variables';

const DynamicAuthModal = dynamic(() => import('components/organisms/auth-modal'), { ssr: false });

function WebApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicAuthModal />
      <GoogleAuthScript />
      <Component {...pageProps} />
      <Footer />
    </QueryClientProvider>
  );
}

function MobileApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <main className='main' id='main'>
      <Component {...pageProps} />
    </main>
  );
}

function MyApp(props: AppProps): JSX.Element {
  const { router } = props;
  const { getToken, getRefreshToken, authenticateTokens, unauthenticate } = useAuth();
  const { themeColors, theme } = useTheme();

  useEffect(() => {
    const token = getToken();
    const refreshToken = getRefreshToken() || '';
    if (token) {
      authenticateTokens({ token, refreshToken });
    } else {
      unauthenticate();
    }
  }, []);

  return (
    <div style={{ backgroundColor: themeColors.bg, color: themeColors.font }}>
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
      <div className={`theme-${theme}`} style={{ height: '100vh', overflow: 'scroll' }}>
        {router.route.startsWith(WEB_APP_ROOT_DIR) ? (
          <WebApp {...props} />
        ) : (
          <MobileApp {...props} />
        )}
      </div>
      <NextNProgress color={themeColors.progressbar} height={3} />
    </div>
  );
}

interface IAppWithProviderProps extends AppProps {
  theme: TTheme;
}

const AppWithProvider = ({ theme, ...props }: IAppWithProviderProps): JSX.Element => {
  return (
    <ThemeProvider defaultTheme={theme}>
      <MyApp {...props} />
    </ThemeProvider>
  );
};

const WrappedApp = wrapper.withRedux(AppWithProvider);

WrappedApp.getInitialProps = async (context: {
  ctx: IServerSideContext;
}): Promise<{ theme: TTheme }> => {
  const { req, res } = context.ctx;
  const theme = (getCookie('theme', { req, res }) || 'light') as TTheme;

  return { theme };
};

export default WrappedApp;
