import { Spinner } from 'assets/icons';
import { FC } from 'react';

import classes from './EditorSpinner.module.scss';

export const EditorSpinner: FC = () => {
  return (
    <div className={classes.spinnerContainer} id={'editorjsSpinner'}>
      <Spinner />
    </div>
  );
};
