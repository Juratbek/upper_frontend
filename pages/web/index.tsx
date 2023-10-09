import { GenericWrapper } from 'components/wrappers';
import { HomePage } from 'frontends/home';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <GenericWrapper>
      <HomePage />
    </GenericWrapper>
  );
};

export default Home;
