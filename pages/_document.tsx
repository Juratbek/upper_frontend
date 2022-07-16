import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document(): JSX.Element {
  return (
    <Html>
      <Head>
        <meta
          name='google-signin-client_id'
          content='919011500766-9bveciqqh23qsfl31suhm7hifva34nt8.apps.googleusercontent.com'
        ></meta>
        <Script
          strategy='afterInteractive'
          src='https://apis.google.com/js/platform.js'
          async
          defer
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
