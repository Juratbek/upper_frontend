import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
} from '@codexteam/icons';

import { IEditorContext } from '../../context';
import { IToolbarSetting } from '../tool.types';
import { IHeaderData } from './Header.types';

function align(
  { setBlock, hoveredBlock }: IEditorContext,
  alignment: Required<IHeaderData['alignment']>,
) {
  if (!hoveredBlock) return;
  const { id, type, data } = hoveredBlock;
  setBlock<IHeaderData>({ id, type, data: { ...data, alignment: alignment } });
}

function generateHeaderLevelSettings(
  level: IHeaderData['level'],
  icon: IToolbarSetting['icon'],
): IToolbarSetting {
  return {
    icon,
    text: `${level}-darajali sarlavha`,
    onClick: ({ setBlock, hoveredBlock }) => {
      if (!hoveredBlock) return;
      const { id, type, data } = hoveredBlock;
      setBlock<IHeaderData>({ id, type, data: { ...data, level } });
    },
  };
}

const headingLevels: { level: IHeaderData['level']; icon: IToolbarSetting['icon'] }[] = [
  { level: 1, icon: IconH1 },
  { level: 2, icon: IconH2 },
  { level: 3, icon: IconH3 },
  { level: 4, icon: IconH4 },
  { level: 5, icon: IconH5 },
  { level: 6, icon: IconH6 },
];

export const HeaderSettings: IToolbarSetting[] = [
  ...headingLevels.map((item) => generateHeaderLevelSettings(item.level, item.icon)),
  {
    icon: IconAlignLeft,
    text: 'Chapga joylashtirish',
    onClick: ({ setBlock, hoveredBlock }) => {
      if (!hoveredBlock) return;
      const { id, type, data } = hoveredBlock;
      delete data.alignment;
      setBlock<IHeaderData>({ id, type, data: data });
    },
  },
  {
    icon: IconAlignCenter,
    text: 'Markazlashtirish',
    onClick: (context) => align(context, 'center'),
  },
  {
    icon: IconAlignRight,
    text: "O'ngga joylashtirish",
    onClick: (context) => align(context, 'right'),
  },
];
