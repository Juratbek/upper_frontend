import { useAppRouter, useTheme } from 'hooks';
import { ICONS } from 'variables/icons';

import { Clickable } from '../Clickable';

const PrevIcon = ICONS.prev;

export const BackButton = (): JSX.Element => {
  const router = useAppRouter();
  const { themeColors } = useTheme();
  const backClickHandler = () => {
    window.history?.length > 2 ? router.back() : router.push('/');
  };

  return (
    <Clickable style={{ display: 'flex', alignItems: 'center' }} onClick={backClickHandler}>
      <PrevIcon color={themeColors.icon} /> Ortga
    </Clickable>
  );
};
