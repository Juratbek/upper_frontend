import {
  IconHeading,
  IconListBulleted,
  IconPicture,
  IconQuote,
  IconText,
  IconWarning,
} from '@codexteam/icons';

import { Alert } from './alert';
import { Code } from './code/Code.tool';
import { Header, HeaderSettings } from './header';
import { Image } from './image/Image.tool';
import { List, ListSettings } from './list';
import { Paragraph } from './paragraph/Paragraph.tool';
import { Quote } from './quote';
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
  alert: {
    toolbar: {
      text: 'Ogohlantiruvchi',
      icon: IconWarning,
    },
    block: Alert,
  },
  quote: {
    toolbar: {
      text: 'Iqtibos',
      icon: IconQuote,
    },
    block: Quote,
  },
} as const;
