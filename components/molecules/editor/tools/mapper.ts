import {
  IconBrackets,
  IconDelimiter,
  IconHeading,
  IconListBulleted,
  IconPicture,
  IconQuote,
  IconTable,
  IconText,
  IconWarning,
} from '@codexteam/icons';

import { Alert } from './alert';
import { Code } from './code/Code.tool';
import { Delimiter } from './delimiter/Delimiter.tools';
import { Header, HeaderSettings } from './header';
import { Image } from './image/Image.tool';
import { List, ListSettings } from './list';
import { Paragraph } from './paragraph/Paragraph.tool';
import { Quote } from './quote';
import { Table } from './table';
import { TToolsMapper } from './tool.types';
import { Unsplash } from './unsplash/Unsplash.tool';

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
  unsplash: {
    block: Unsplash,
  },
  code: {
    toolbar: {
      text: 'Kod',
      icon: IconBrackets,
    },
    block: Code,
  },
  delimiter: {
    toolbar: {
      text: 'Ajratuvchi',
      icon: IconDelimiter,
    },
    block: Delimiter,
  },
  list: {
    toolbar: {
      text: "Ro'yxat",
      icon: IconListBulleted,
    },
    block: List,
    settings: ListSettings,
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
  table: {
    toolbar: {
      text: 'Jadval',
      icon: IconTable,
    },
    block: Table,
  },
} as const;
