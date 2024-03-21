import { useAppRouter } from 'hooks';
import { ICONS } from 'variables/icons';

import { Clickable } from '../Clickable';

const PrevIcon = ICONS.prev;

export const BackButton = (): JSX.Element => {
  const router = useAppRouter();
  const backClickHandler = () => {
    window.history?.length > 2 ? router.back() : router.push('/');
  };

  return (
    <Clickable
      style={{ color: '#007AFF', display: 'flex', alignItems: 'center' }}
      onClick={backClickHandler}
    >
      <PrevIcon color='#007AFF' /> Ortga
    </Clickable>
  );
};
