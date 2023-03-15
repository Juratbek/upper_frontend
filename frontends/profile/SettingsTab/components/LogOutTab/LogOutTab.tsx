import { Button } from 'components';
import { useAuth } from 'hooks';
import { useRouter } from 'next/router';

export const LogOutTab = (): JSX.Element => {
  const { unauthenticate } = useAuth();
  const router = useRouter();
  const logOut = (): void => {
    unauthenticate();
    router.push('/');
  };
  return (
    <div>
      <h3>Profilingizdan chiqmoqchimisiz</h3>
      <Button onClick={logOut} color='outline-dark'>
        Profildan chiqish
      </Button>
    </div>
  );
};
