import { IconMenu } from '@codexteam/icons';
import { FC } from 'react';
import { getClassName } from 'utils';
import { ICONS } from 'variables/icons';

import classes from './ActionButtons.module.scss';

const PlusIcon = ICONS.plus;

export const ActionButtons: FC<{
  onPlus: VoidFunction;
  onSettings: VoidFunction;
  color: string;
}> = ({ onPlus, onSettings, color }) => (
  <div className={classes.container}>
    <button className={getClassName(classes.btn, 'action-button')} onClick={onPlus}>
      <PlusIcon color={color} width={32} height={32} strokeWidth={3} />
    </button>
    <button
      className={getClassName(classes.btn, 'action-button')}
      onClick={onSettings}
      dangerouslySetInnerHTML={{ __html: IconMenu }}
    />
  </div>
);
