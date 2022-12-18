import { FC, MouseEvent, useEffect } from 'react';

import { IMAGE_MODAL, ZOOM_ATTRIBUTE } from './ImageModal.constants';
import styles from './ImageModal.module.scss';
import { IImageModalProps } from './ImageModal.types';

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
    images.forEach((img) => {
      if (img.dataset.hasZoom) return;
      img.addEventListener('click', zoomOnClick);
      img.dataset[ZOOM_ATTRIBUTE] = 'true';
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener('click', zoomOnClick);
        delete img.dataset[ZOOM_ATTRIBUTE];
      });
    };
  }, [images]);

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
