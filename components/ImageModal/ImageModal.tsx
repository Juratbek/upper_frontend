import { FC, MouseEvent } from 'react';

import styles from './ImageModal.module.scss';

export const ImageModal: FC = () => {
  const closeModal = (e: MouseEvent<HTMLDivElement>): void => {
    const target = e.currentTarget as HTMLDivElement;
    target.style.display = 'none';
  };

  return (
    <div id='imgModal' className={styles.modal} onClick={(e): void => closeModal(e)}>
      <div className={styles['modal__overlay']}></div>
      <span className={styles['modal__close-icon']}>&times;</span>
      <div className={styles['modal__content']} id={'modalContent'}></div>
    </div>
  );
};
