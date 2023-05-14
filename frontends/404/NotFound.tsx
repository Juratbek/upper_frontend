import { Button } from 'components';
import Link from 'next/link';
import { IMAGES, WEB_APP_ROOT_DIR } from 'variables';

import classes from './NotFound.module.scss';

const NotFoundImg = IMAGES.notFound;

export const NotFound = (): JSX.Element => {
  return (
    <div className={classes['not-found']}>
      <div>
        <div className={classes.img}>
          <NotFoundImg />
        </div>
        <div className='text-center'>
          <h1>Sahifa topilmadi</h1>
          <Link href={WEB_APP_ROOT_DIR}>
            <a>
              <Button>Bosh sahifaga qaytish</Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
