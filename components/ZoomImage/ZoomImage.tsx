import Image, { ImageProps } from 'next/image';
import { FC, useEffect, useState } from 'react';

import imageModalStyles from '../ImageModal/ImageModal.module.scss';

export const ZoomImage: FC<ImageProps> = (props) => {
  const [mainImgURL, setMainImgURL] = useState<string>(props.src as string);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (): void => setIsModalOpen((prevState) => !prevState);

  const errorHandler = (): void => setMainImgURL(props.src.toString());

  useEffect(() => {
    setMainImgURL(props.src as string);
  }, [props.src]);

  return (
    <>
      {isModalOpen && (
        <div className={imageModalStyles.modal} style={{ display: 'block' }} onClick={toggleModal}>
          <div className={imageModalStyles['modal__overlay']}></div>
          <div className={imageModalStyles['modal__content']}>
            <Image {...props} src={mainImgURL} />
          </div>
          <div style={{ visibility: 'hidden' }}>
            <Image
              {...props}
              src={`${props.src}_MAIN`}
              onLoadingComplete={(): void => setMainImgURL(`${props.src}_MAIN`)}
              onError={errorHandler}
            />
          </div>
        </div>
      )}
      <Image {...props} onClick={toggleModal} />
    </>
  );
};
