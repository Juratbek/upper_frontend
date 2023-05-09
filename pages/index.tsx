import { GetServerSideProps } from 'next';

export default function Index(): JSX.Element {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/web/',
      permanent: false,
    },
  };
};
