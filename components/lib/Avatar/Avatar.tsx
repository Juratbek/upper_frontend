import { useTheme } from 'hooks';
import Image from 'next/image';
import { FC, useMemo, useState } from 'react';
import { getClassName } from 'utils';

import { getImageType } from '../../../utils/image/imageZoom';
import { ZoomImage } from '../../ZoomImage';
import classes from './Avatar.module.scss';
import { IAvatarProps } from './Avatar.types';

export const Avatar: FC<IAvatarProps> = ({
  size = 'medium',
  imgUrl,
  zoomable = false,
  ...props
}) => {
  const [error, setError] = useState<string>();
  const { themeColors } = useTheme();
  const className = getClassName(classes.avatar, classes[`avatar--${size}`], props.className);

  const image = useMemo(() => {
    if (!imgUrl || error) return <Image src='/social_medi_logo.png' alt='UPPER' layout='fill' />;
    const imageType = getImageType(imgUrl);

    if (!zoomable || !imageType.zoomable)
      return (
        <Image
          src={imgUrl}
          onError={(): unknown => setError('Image load error')}
          alt='UPPER'
          layout='fill'
          objectFit='cover'
        />
      );

    return (
      <ZoomImage
        src={imgUrl}
        alt='UPPER'
        layout='fill'
        objectFit='cover'
        className={classes.zoomable}
      />
    );
  }, [imgUrl, zoomable, error]);

  return (
    <>
      <div className={className} style={{ borderColor: themeColors.avatar.border }}>
        {image}
      </div>
    </>
  );
};
