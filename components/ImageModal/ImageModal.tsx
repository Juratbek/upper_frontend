import { FC, MouseEvent, useEffect } from 'react';

import styles from './ImageModal.module.scss';

export const IMAGE_MODAL = {
  CONTAINER_ID: 'imgModal',
  CONTENT_ID: 'modalContent',
};

interface IImageModalProps {
  images: HTMLElement[];
}

export const ImageModal: FC<IImageModalProps> = ({ images = [] }) => {
  const closeModal = (e: MouseEvent<HTMLDivElement>): void => {
    const target = e.currentTarget as HTMLDivElement;
    target.style.display = 'none';
  };

  const zoomOnClick = (e: Event): void => {
    const target = e.target as HTMLElement;
    const clonedImg = target.cloneNode(true);
    const imgModal = document.querySelector('#' + IMAGE_MODAL.CONTAINER_ID) as HTMLElement;
    const imgModalContent = imgModal.querySelector('#' + IMAGE_MODAL.CONTENT_ID) as HTMLElement;
    imgModalContent.innerHTML = '';
    imgModalContent.appendChild(clonedImg);
    imgModal.style.display = 'block';
  };

  useEffect(() => {
    if (images.length > 0) {
      images.forEach((img) => {
        if (img.dataset.hasZoom) return;
        img.addEventListener('click', zoomOnClick);
        img.dataset.hasZoom = 'true';
      });
    }
  });

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        img.removeEventListener('click', zoomOnClick);
      });
    };
  }, []);

  return (
    <div
      id={IMAGE_MODAL.CONTAINER_ID}
      className={styles.modal}
      onClick={(e): void => closeModal(e)}
    >
      <div className={styles['modal__overlay']}></div>
      <div className={styles['modal__content']} id={IMAGE_MODAL.CONTENT_ID}></div>
    </div>
  );
};
