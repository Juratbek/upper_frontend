import { useRouter } from 'next/router';
import { ICONS } from 'variables/icons';

import { Clickable } from '../Clickable';

const PrevIcon = ICONS.prev;

export const BackButton = (): JSX.Element => {
  const router = useRouter();
  const backClickHandler = () => {
    window.history?.length > 1 ? router.back() : router.push('/web');
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
