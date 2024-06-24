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
  shortcuts: ['r'],
  sanitize: (data: IBlockData['data']): IBlockData<IImageData>['data'] | undefined => {
    if (!data.file?.url) return;

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
  tags: ['figure', 'img', 'p'],
  onPaste: (node) => {
    const element = node as HTMLElement;
    let caption: string | undefined;
    let image: HTMLImageElement | undefined | null;
    let isStretched = true;

    if (element.nodeName === 'IMG') {
      image = element as HTMLImageElement;
    } else {
      image = element.querySelector('img');
      if (!image) return null;

      if (element.nodeName === 'P') isStretched = false;
    }

    if (element.nodeName === 'FIGURE') {
      const figcaption = element.querySelector('figcaption');
      caption = figcaption?.innerHTML;
    }

    if (!image) return null;

    return {
      file: { url: image.src, name: image.alt },
      alignment: 'center',
      stretched: isStretched,
      caption: caption,
    } satisfies IBlockData<IImageData>['data'];
  },
};
