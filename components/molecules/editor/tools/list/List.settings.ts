import { IconListBulleted, IconListNumbered } from '@codexteam/icons';

import { IToolbarSetting } from '../tool.types';
import { IListData } from './List.types';

export const ListSettings: IToolbarSetting[] = [
  {
    icon: IconListNumbered,
    text: 'Raqamli',
    onClick: ({ setBlock, hoveredBlock }) => {
      if (!hoveredBlock) return;
      const { id, type, data } = hoveredBlock;
      delete data.alignment;
      setBlock<IListData>({ id, type, data: { ...data, style: 'ordered' } });
    },
  },
  {
    icon: IconListBulleted,
    text: 'Nuqtali',
    onClick: ({ setBlock, hoveredBlock }) => {
      if (!hoveredBlock) return;
      const { id, type, data } = hoveredBlock;
      delete data.style;
      setBlock<IListData>({ id, type, data: data });
    },
  },
];
