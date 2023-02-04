import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';

export const checkAuthInServer: GetServerSideProps = async ({ req, res }) => {
  const token = getCookie('token', { req, res }) || null;
  if (!token) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  return {
    props: {
      token,
      test: 'test',
    },
  };
};
