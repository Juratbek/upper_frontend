import { Head } from 'components/lib';
import { Header } from 'components/organisms';
import { TeamPage } from 'frontends/team';
import { NextPage } from 'next';

const TeamNextPage: NextPage = () => {
  return (
    <>
      <div className='w-100'>
        <Header />
      </div>
      <Head title='Jamoa' url='/team' />
      <TeamPage />
    </>
  );
};

export default TeamNextPage;
