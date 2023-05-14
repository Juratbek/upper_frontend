import { Head } from 'components';
import { TeamPage } from 'frontends/team';
import { NextPage } from 'next';

const TeamNextPage: NextPage = () => {
  return (
    <div>
      <Head title='Jamoa' url='/team' />
      <TeamPage />
    </div>
  );
};

export default TeamNextPage;
