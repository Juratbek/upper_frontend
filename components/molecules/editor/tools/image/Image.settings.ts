import { IconAddBackground, IconAddBorder, IconStretch } from '@codexteam/icons';

import { IEditorContext } from '../../context';
import { IToolbarSetting } from '../tool.types';
import { IImageData } from './Image.types';

type TParam = 'stretched' | 'withBackground' | 'withBorder';

function changeSetting({ setBlock, hoveredBlock }: IEditorContext<IImageData>, param: TParam) {
  if (!hoveredBlock) return;
  hoveredBlock.data[param] = !hoveredBlock.data[param] ?? true;
  setBlock(hoveredBlock);
}

function checkIsActive({ hoveredBlock }: IEditorContext<IImageData>, param: TParam) {
  return hoveredBlock!.data[param] ?? false;
}

export const ImageSettings: IToolbarSetting<IImageData>[] = [
  {
    icon: IconAddBorder,
    text: 'Chegara bilan',
    active: (context) => checkIsActive(context, 'withBorder'),
    onClick: (context) => changeSetting(context, 'withBorder'),
  },
  {
    icon: IconStretch,
    text: "Rasmni cho'zish",
    active: (context) => checkIsActive(context, 'stretched'),
    onClick: (context) => changeSetting(context, 'stretched'),
  },
  {
    icon: IconAddBackground,
    text: 'Orqa fon bilan',
    active: (context) => checkIsActive(context, 'withBackground'),
    onClick: (context) => changeSetting(context, 'withBackground'),
  },
  {
    icon: IconAddBackground,
    text: "O'rtaga joylashtirish",
    active: ({ hoveredBlock }) => hoveredBlock?.data.alignment === 'center',
    onClick: ({ hoveredBlock, setBlock }) => {
      if (!hoveredBlock) return;
      if (hoveredBlock.data.alignment === 'center') {
        delete hoveredBlock.data.alignment;
      } else {
        hoveredBlock.data.alignment = 'center';
      }
      setBlock(hoveredBlock);
    },
  },
];
