import { GenericWrapper } from 'components/wrappers';
import { Profile } from 'frontends/profile';
import { checkAuthInServer } from 'utils';

const ProfilePage = (): JSX.Element => {
  return (
    <GenericWrapper classes={{ main: 'pt-l-2' }}>
      <Profile />
    </GenericWrapper>
  );
};

export default ProfilePage;

export const getServerSideProps = checkAuthInServer;
