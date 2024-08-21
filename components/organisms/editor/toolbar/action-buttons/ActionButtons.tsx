import { IconMenu } from '@codexteam/icons';
import { PlusIcon } from 'components/icons';
import { forwardRef } from 'react';
import { getClassName } from 'utils';

import classes from './ActionButtons.module.scss';

export const ActionButtons = forwardRef<
  HTMLDivElement,
  {
    onPlus: VoidFunction;
    onSettings: VoidFunction;
    color: string;
  }
>(function Component({ onPlus, onSettings, color }, ref) {
  return (
    <div className={classes.container} ref={ref}>
      <button
        className={getClassName(classes.btn, 'action-button')}
        onClick={onPlus}
        aria-label='plus'
      >
        <PlusIcon color={color} width={32} height={32} />
      </button>
      <button
        aria-label='settings'
        className={getClassName(classes.btn, 'action-button')}
        onClick={onSettings}
        dangerouslySetInnerHTML={{ __html: IconMenu }}
      />
    </div>
  );
});
