import { Button } from 'components';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { IGetServerSideProps, TAuthProvider } from 'types';

const SignInPage = ({ providers }: { providers: TAuthProvider }): JSX.Element => {
  console.log('🚀 ~ file: index.tsx ~ line 6 ~ providers', providers);
  return (
    <form>
      {Object.values(providers).map((provider) => (
        <Button
          key={provider.id}
          color='outline-dark'
          onClick={(): void => {
            signIn(provider.id);
          }}
        >
          {provider.name} orqali ro`yxatdan o`tish
        </Button>
      ))}
    </form>
  );
};

export async function getServerSideProps(
  context,
): Promise<IGetServerSideProps<{ providers: TAuthProvider | null }>> {
  // const { req } = context;
  // const session = await getSession({ req });
  // console.log('🚀 ~ file: index.tsx ~ line 28 ~ session', session);
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //     },
  //   };
  // }
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
export default SignInPage;
