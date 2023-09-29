import { Head, Html, Main, NextScript } from 'next/document';

export default function Document(): JSX.Element {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/logo.svg' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
