import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document(): JSX.Element {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/logo.svg' />
        <Script strategy='beforeInteractive' src='https://telegram.org/js/telegram-widget.js?19' />
      </Head>
      <body>
        <Main />
        <div id='modal' />
        <NextScript />
      </body>
    </Html>
  );
}
