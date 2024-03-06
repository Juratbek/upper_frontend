import { Head, Html, Main, NextScript } from 'next/document';

export default function Document(): JSX.Element {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/logo.svg' />
        <link
          href='https://fonts.googleapis.com/css2?family=Unbounded:wght@800&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
