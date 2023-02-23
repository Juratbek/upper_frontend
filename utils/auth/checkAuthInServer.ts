import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';

export const checkAuthInServer: GetServerSideProps = async ({ req, res, resolvedUrl }) => {
  const token = getCookie('token', { req, res }) || null;
  if (!token) {
    return {
      redirect: {
        destination: `/login?redirect=${resolvedUrl}&message=${"Iltimos profilingizga kiring yoki ro'yxatdan o'ting"}`,
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
