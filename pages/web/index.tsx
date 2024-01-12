import { GenericWrapper } from 'components/wrappers';
import { HomePage } from 'frontends/home';
import { LandingPage } from 'frontends/landing';
import { useAuth } from 'hooks';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { status } = useAuth();

  if (status === 'authenticated') {
    return (
      <GenericWrapper>
        <HomePage />
      </GenericWrapper>
    );
  }
  if (status === 'unauthenticated') {
    return <LandingPage />;
  }
};

export default Home;
