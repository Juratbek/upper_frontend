import { memo } from 'react';
import { compressImage, getClassName, toBase64 } from 'utils';

import { IToolProps } from '../tool.types';
import { Caption } from './Caption';
import classes from './Image.module.scss';
import { IImageData } from './Image.types';
import { UploadImage } from './upload/UploadImage';

export const Image = memo(
  function Memoized({ data, isEditable, api, id, type }: IToolProps<IImageData>) {
    const { file } = data;

    const uploadImageHandler = async (file: File) => {
      const compressedFile = await compressImage(file);
      const imageUrl = await toBase64(compressedFile);

      const f: IImageData['file'] = {
        url: imageUrl?.toString() ?? '',
      };

      api.setBlock({ id, type, data: { ...data, file: f } });
    };

    return (
      <figure>
        {file?.url ? (
          <>
            <div className={getClassName(data.withBackground && classes['with-background'])}>
              <img
                src={file.url}
                alt=''
                className={getClassName(
                  classes.image,
                  data.stretched && classes.stretched,
                  data.withBorder && classes['with-border'],
                  data.alignment && classes[data.alignment],
                )}
              />
            </div>
            <Caption data={data} isEditable={isEditable} />
          </>
        ) : (
          <UploadImage onUpload={uploadImageHandler} />
        )}
      </figure>
    );
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
