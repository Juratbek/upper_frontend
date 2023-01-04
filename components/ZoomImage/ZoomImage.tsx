import Image, { ImageProps } from 'next/image';
import { FC, useState } from 'react';

import imageModalStyles from '../ImageModal/ImageModal.module.scss';

export const ZoomImage: FC<ImageProps> = (props) => {
  const [mediumImgUrl, setMediumImgUrl] = useState<string>(`${props.src}_MEDIUM`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (): void => setIsModalOpen((prevState) => !prevState);

  const errorHandler = (): void => setMediumImgUrl(props.src.toString());

  return isModalOpen ? (
    <div className={imageModalStyles.modal} style={{ display: 'block' }} onClick={toggleModal}>
      <div className={imageModalStyles['modal__overlay']}></div>
      <div className={imageModalStyles['modal__content']}>
        <Image {...props} src={mediumImgUrl} onError={errorHandler} />
      </div>
    </div>
  ) : (
    <Image {...props} onClick={toggleModal} />
  );
};
