import { FC } from 'react';

import { IToolProps } from '../tool.types';
import classes from './Image.module.scss';
import { IImageData } from './Image.types';

export const Image: FC<IToolProps<IImageData>> = ({ data }) => {
  if (!data) {
    return (
      <div>
        <input type='file' />
      </div>
    );
  }
  const { file } = data;

  return (
    <div>
      <img src={file.url} alt='' className={classes.image} />
    </div>
  );
};
