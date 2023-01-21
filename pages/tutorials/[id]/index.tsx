import { TutorialPage } from 'frontends/tutorials';
import { NextPage } from 'next';
import { checkAuthInServer } from 'utils';

const TutorialNextPage: NextPage = () => {
  return <TutorialPage />;
};

export default TutorialNextPage;

export const getServerSideProps = checkAuthInServer;
