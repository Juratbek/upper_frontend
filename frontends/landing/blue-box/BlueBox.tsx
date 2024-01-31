import { UpRight } from 'components/icons/UpRight';
import { Clickable } from 'components/lib';
import { useAuth } from 'hooks';
import { FC } from 'react';

import { LogosBox } from '../logos-box/LogosBox';
import classes from './BlueBox.module.scss';

export const BlueBox: FC = () => {
  const { openLoginPage } = useAuth();

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>upper bilan yanada yuqoriroq</h1>
      <div className={classes.body}>
        <Clickable className={classes.start} onClick={() => openLoginPage()}>
          <span className={classes['start-text']}>Boshladik</span>
          <span className={classes['up-right-icon']}>
            <UpRight />
          </span>
        </Clickable>
        <LogosBox />
      </div>
    </div>
  );
};
