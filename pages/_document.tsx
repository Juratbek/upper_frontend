import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import { TTheme } from 'types';

export default function Document(context: DocumentProps): JSX.Element {
  const theme = context['__NEXT_DATA__']?.props?.theme;

  return (
    <Html>
      <Head>
        <link rel='icon' href='/logo.svg' />
        <link
          href='https://fonts.googleapis.com/css2?family=Unbounded:wght@800&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body className={`theme-${theme}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const theme = (getCookie('theme', { req, res }) || 'light') as TTheme;

  return {
    props: {
      theme,
    },
  };
};
