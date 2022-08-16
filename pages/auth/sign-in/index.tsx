import { Button } from 'components';
import { getProviders, signIn } from 'next-auth/react';
import { IGetServerSideProps, TAuthProviders } from 'types';

const SignInPage = ({ providers }: { providers: TAuthProviders }): JSX.Element => {
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

export async function getServerSideProps(): Promise<
  IGetServerSideProps<{ providers: TAuthProviders | null }>
> {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
export default SignInPage;
