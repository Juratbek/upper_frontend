import Image from 'next/image';

import styles from './Noticeboard.module.scss';

export const NoticeBoard = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Image src='/icons/islam.svg' width={20} height={20} alt='RAMADAN' />
      <p className={styles.text}>
        <span className='fw-6'>UPPER </span>
        jamoasi sizni <span className='fw-6'>ramazon</span> bilan qutlaydi
      </p>
    </div>
  );
};
