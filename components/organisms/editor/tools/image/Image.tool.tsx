import { Spinner } from 'components/lib';
import NextJsImage from 'next/image';
import { memo, useMemo, useState } from 'react';
import { compressImage, getClassName } from 'utils';

import { IToolProps } from '../tool.types';
import { Caption } from './Caption';
import classes from './Image.module.scss';
import { IImageData } from './Image.types';
import { UploadImage } from './upload/UploadImage';

export const Image = memo(
  function Memoized({ data, isEditable, api, id, type, config }: IToolProps<IImageData>) {
    const { file } = data;
    const [isUploading, setIsUploading] = useState(false);

    const uploadImageHandler = async (file: File) => {
      const compressedImage = await compressImage(file);
      if (!config.upload) {
        console.error('upload callback is not provided for image block');
        return;
      }

      setIsUploading(true);
      const { url: uploadedFileUrl } = await config.upload(compressedImage.file);
      setIsUploading(false);

      const f: IImageData['file'] = {
        url: uploadedFileUrl,
        width: compressedImage.width,
        height: compressedImage.height,
        name: compressedImage.name ?? '',
      };

      api.setBlock({ id, type, data: { ...data, file: f } });
    };

    const imgClassName = getClassName(
      classes.image,
      data.stretched && classes.stretched,
      data.withBorder && classes['with-border'],
      data.alignment && classes[data.alignment],
    );

    const image = useMemo(() => {
      if (!file) return;

      if (file.width && file.height) {
        return (
          <NextJsImage
            src={file.url}
            width={file.width}
            height={file.height}
            alt={file.name}
            className={imgClassName}
          />
        );
      }

      return <img src={file.url} alt={file.name} className={imgClassName} />;
    }, [isUploading, file]);

    const imageContainer = useMemo(
      () => (
        <>
          <div className={getClassName(data.withBackground && classes['with-background'])}>
            {image}
          </div>
          <Caption data={data} isEditable={isEditable} />
        </>
      ),
      [image, data, isEditable],
    );

    const body = useMemo(() => {
      if (isUploading) {
        return (
          <div style={{ height: 100, display: 'grid', placeItems: 'center' }}>
            <Spinner />
          </div>
        );
      }

      if (file?.url) {
        return imageContainer;
      }

      return <UploadImage onUpload={uploadImageHandler} />;
    }, [isUploading, uploadImageHandler, imageContainer]);

    return <figure>{body}</figure>;
  },
  (prevProps, currentProps) => {
    const prevData = prevProps.data;
    const currentData = currentProps.data;

    if (
      prevData.file !== currentData.file ||
      prevData.alignment !== currentData.alignment ||
      prevData.stretched !== currentData.stretched ||
      prevData.withBackground !== currentData.withBackground ||
      prevData.withBorder !== currentData.withBorder
    )
      return false;

    return true;
  },
);
