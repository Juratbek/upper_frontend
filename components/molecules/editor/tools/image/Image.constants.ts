import { IconPicture } from '@codexteam/icons';

import { IBlockData } from '../../instance/Editor.types';
import { ITool } from '../tool.types';
import { ImageSettings } from './Image.settings';
import { Image } from './Image.tool';
import { IImageData } from './Image.types';

export const ImageTool: ITool = {
  toolbar: {
    text: 'Rasm',
    icon: IconPicture,
  },
  settings: ImageSettings,
  sanitize: (data: IBlockData['data']): IBlockData<IImageData>['data'] => {
    return {
      file: data.file,
      caption: data.caption,
      alignment: data.alignment,
      stretched: data.stretched,
      withBackground: data.withBackground,
      withBorder: data.withBorder,
    };
  },
  block: Image,
  tags: ['figure'],
  onPaste: (node) => {
    const figure = node as HTMLElement;
    const picture = figure.querySelector('picture');
    const img = picture?.querySelector('img');

    if (!img) return null;
    const figcaption = figure.querySelector('figcaption');

    return {
      file: { url: img.src },
      alignment: 'center',
      stretched: true,
      caption: figcaption?.innerHTML,
    } satisfies IBlockData<IImageData>['data'];
  },
};
