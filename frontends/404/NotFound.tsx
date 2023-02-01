import { IMAGES } from 'variables';

import classes from './NotFound.module.scss';

const NotFoundImg = IMAGES.notFound;

export const NotFound = (): JSX.Element => {
  return (
    <div className={classes['not-found']}>
      <div>
        <div className={classes.img}>
          <NotFoundImg />
        </div>
        <h1 className='text-center'>Sahifa topilmadi</h1>
      </div>
    </div>
  );
};
