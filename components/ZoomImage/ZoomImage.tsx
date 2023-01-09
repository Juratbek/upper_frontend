import Image, { ImageProps } from 'next/image';
import { FC, useEffect, useState } from 'react';

import imageModalStyles from '../ImageModal/ImageModal.module.scss';

export const ZoomImage: FC<ImageProps> = (props) => {
  const [mediumImgUrl, setMediumImgUrl] = useState<string>(props.src as string);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (): void => setIsModalOpen((prevState) => !prevState);

  const errorHandler = (): void => setMediumImgUrl(props.src.toString());

  useEffect(() => {
    if (isModalOpen && props.src == mediumImgUrl) {
      const image = new window.Image();
      image.src = `${props.src}_MEDIUM`;
      image.onload = (): void => {
        setMediumImgUrl(`${props.src}_MEDIUM`);
      };
    }
  }, [isModalOpen, props.src]);

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
