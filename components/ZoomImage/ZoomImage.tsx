import Image, { ImageProps } from 'next/image';
import { FC, useState } from 'react';

import imageModalStyles from '../ImageModal/ImageModal.module.scss';

export const ZoomImage: FC<ImageProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (): void => setIsModalOpen((prevState) => !prevState);

  return isModalOpen ? (
    <div className={imageModalStyles.modal} style={{ display: 'block' }} onClick={toggleModal}>
      <div className={imageModalStyles['modal__overlay']}></div>
      <div className={imageModalStyles['modal__content']}>
        <Image {...props} />
      </div>
    </div>
  ) : (
    <Image {...props} onClick={toggleModal} />
  );
};
