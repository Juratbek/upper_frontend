import { IconAddBackground, IconAddBorder, IconStretch } from '@codexteam/icons';

import { IEditorContext } from '../../context';
import { IToolbarSetting } from '../tool.types';
import { getCurrentBlock } from '../utils';
import { IImageData } from './Image.types';

type TParam = 'stretched' | 'withBackground' | 'withBorder';

function changeSetting(context: IEditorContext<IImageData>, param: TParam) {
  const { setBlock } = context;
  const block = getCurrentBlock<IImageData>(context);

  if (!block) return;
  const data = { ...block.data };

  data[param] = !data[param] ?? true;
  setBlock({ ...block, data });
}

function checkIsActive(context: IEditorContext<IImageData>, param: TParam) {
  const block = getCurrentBlock<IImageData>(context);
  return block?.data[param] ?? false;
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
    active: (context) => getCurrentBlock<IImageData>(context)?.data.alignment === 'center',
    onClick: (context) => {
      const { setBlock } = context;
      const block = getCurrentBlock<IImageData>(context);
      if (!block) return;
      const data = { ...block.data };

      if (data.alignment === 'center') {
        delete data.alignment;
      } else {
        data.alignment = 'center';
      }

      setBlock({ ...block, data });
    },
  },
];
