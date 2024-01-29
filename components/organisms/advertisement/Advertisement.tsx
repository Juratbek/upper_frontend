import { Button } from 'components/lib';

import classes from './Advertisement.module.scss';

export const Advertisement = () => (
  <div>
    <div className={classes['add-container']}>
      <h4 className={classes.sale}>Chegirma</h4>
      <h3 className={classes.percent}>15%</h3>
      <p className={classes.text}>UPPER promokodi bilan Frontint.uz kurslariga chegirma oling</p>
    </div>
    <a href='https://frontint.uz/' target='_blank' rel='noreferrer'>
      <Button className={`mt-1 w-100 ${classes.btn}`}>Chegirma olish</Button>
    </a>
  </div>
);
