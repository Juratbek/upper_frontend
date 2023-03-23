import Image from 'next/image';
import Link from 'next/link';

import styles from './Noticeboard.module.scss';

export const NoticeBoard = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Image
        src='/images/ramadan.svg'
        width={32}
        height={32}
        alt='RAMADAN'
        objectFit='cover'
        blurDataURL='data:/images/ramadan.svg'
        placeholder='blur'
      />
      <p className={styles.text}>
        <Link href='https://upper.uz/'>
          <a>
            <b>Upper </b>
          </a>
        </Link>
        jamoasi sizni ramazon bilan tabriklaydi.
      </p>
    </div>
  );
};
