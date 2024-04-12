import { IconHeading, IconListBulleted, IconPicture, IconText } from '@codexteam/icons';

import { Code } from './code/Code.tool';
import { Header, HeaderSettings } from './header';
import { Image } from './image/Image.tool';
import { List, ListSettings } from './list';
import { Paragraph } from './paragraph/Paragraph.tool';
import { TToolsMapper } from './tool.types';

export const EDITOR_TOOLS: TToolsMapper = {
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
    settings: HeaderSettings,
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
    settings: ListSettings,
  },
  code: {
    toolbar: {
      text: 'Kod',
      icon: IconHeading,
    },
    block: Code,
  },
} as const;
