import { Button } from 'components/lib';
import Image from 'next/image';

import classes from './Sidebar.module.scss';

export const Sidebar = (): JSX.Element => {
  return (
    <>
      <div className={classes['ad-box']}>
        <p className={classes['ad-text']}>Bu yerda sizning reklamangiz !!!</p>
        <Image width={171} height={171} alt='alert' src='/alert.png' />
      </div>
      <Button className={classes.btn}>Murojat qilish</Button>
    </>
  );
};
