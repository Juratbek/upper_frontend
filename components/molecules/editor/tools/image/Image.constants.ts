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
    let src: string | undefined;
    let isStretched = true;

    if (element.nodeName === 'IMG') {
      src = (element as HTMLImageElement).src;
    } else {
      const img = element.querySelector('img');
      if (!img) return null;
      src = img.src;

      if (element.nodeName === 'P') isStretched = false;
    }

    if (element.nodeName === 'FIGURE') {
      const figcaption = element.querySelector('figcaption');
      caption = figcaption?.innerHTML;
    }

    if (!src) return null;

    return {
      file: { url: src },
      alignment: 'center',
      stretched: isStretched,
      caption: caption,
    } satisfies IBlockData<IImageData>['data'];
  },
};
