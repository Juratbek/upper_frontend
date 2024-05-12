import { memo } from 'react';
import { getClassName } from 'utils';

import { IToolProps } from '../tool.types';
import classes from './Image.module.scss';
import { IImageData } from './Image.types';

export const Image = memo(
  function Memoized({ data, isEditable }: IToolProps<IImageData>) {
    if (!data && isEditable) {
      return (
        <div>
          <input type='file' />
        </div>
      );
    }
    const { file, caption } = data;

    const renderCaption = () => {
      if (isEditable) {
        return (
          <figcaption
            className={classes.caption}
            contentEditable
            dangerouslySetInnerHTML={{ __html: caption ?? '' }}
          />
        );
      }

      if (!caption) return;

      return (
        <figcaption className={classes.caption} dangerouslySetInnerHTML={{ __html: caption }} />
      );
    };

    return (
      <figure>
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
        {renderCaption()}
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
