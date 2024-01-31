import { useRouter } from 'next/router';
import { ICONS } from 'variables/icons';

import { Clickable } from '../Clickable';

const PrevIcon = ICONS.prev;

export const BackButton = (): JSX.Element => {
  const router = useRouter();
  return (
    <Clickable
      style={{ color: '#007AFF', display: 'flex', alignItems: 'center' }}
      onClick={router.back}
    >
      <PrevIcon color='#007AFF' /> Ortga
    </Clickable>
  );
};
