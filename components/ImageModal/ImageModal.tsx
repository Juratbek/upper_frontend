import Image from 'next/image';
import { FC } from 'react';

import styles from './ImageModal.module.scss';

const ImageModal: FC = () => {
  return (
    <div id='imgModal' className={styles.modal}>
      <span className={styles['modal__close-icon']}>&times;</span>
      <Image src={''} alt={'img'} className={styles['modal__content']} />
      <div className={styles['modal__caption']}></div>
    </div>
  );
};
