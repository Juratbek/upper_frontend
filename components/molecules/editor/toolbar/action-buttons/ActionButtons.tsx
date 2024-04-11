import { IconMenu } from '@codexteam/icons';
import { FC } from 'react';
import { ICONS } from 'variables/icons';

import classes from './ActionButtons.module.scss';

const PlusIcon = ICONS.plus;

export const ActionButtons: FC<{ onPlus: VoidFunction; onSettings: VoidFunction }> = ({
  onPlus,
  onSettings,
}) => (
  <div className={classes.container}>
    <button className={classes.btn} onClick={onPlus}>
      <PlusIcon width={32} height={32} strokeWidth={3} />
    </button>
    <button
      className={classes.btn}
      onClick={onSettings}
      dangerouslySetInnerHTML={{ __html: IconMenu }}
    />
  </div>
);
