import { IconHeading, IconListBulleted, IconPicture, IconText } from '@codexteam/icons';

import { Code } from './code/Code.tool';
import { Header } from './header/Header.tool';
import { Image } from './image/Image.tool';
import { List } from './list/List.tool';
import { Paragraph } from './paragraph/Paragraph.tool';
import { ITool, TToolType } from './tool.types';

export const EDITOR_TOOLS: Record<TToolType, ITool> = {
  paragraph: {
    toolbar: {
      text: 'Matn',
      icon: IconText,
    },
    block: Paragraph,
  },
  header: {
    toolbar: {
      text: 'Sarlavha',
      icon: IconHeading,
    },
    block: Header,
  },
  image: {
    toolbar: {
      text: 'Rasm',
      icon: IconPicture,
    },
    block: Image,
  },
  list: {
    toolbar: {
      text: "Ro'yxat",
      icon: IconListBulleted,
    },
    block: List,
  },
  code: {
    toolbar: {
      text: 'Kod',
      icon: IconHeading,
    },
    block: Code,
  },
} as const;
