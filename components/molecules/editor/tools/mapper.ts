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

import { IBlockData } from '../instance/Editor.types';
import { Alert } from './alert';
import { Code } from './code/Code.tool';
import { Delimiter } from './delimiter/Delimiter.tools';
import { Header, HeaderSettings } from './header';
import { IHeaderData } from './header/Header.types';
import { Image, ImageSettings } from './image';
import { IImageData } from './image/Image.types';
import { List, ListSettings } from './list';
import { IListData } from './list/List.types';
import { IParagraphData, Paragraph } from './paragraph';
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
    sanitize: (data: IBlockData['data']): IBlockData<IParagraphData>['data'] => {
      return { text: data.text };
    },
    block: Paragraph,
  },
  header: {
    toolbar: {
      text: 'Sarlavha',
      icon: IconHeading,
    },
    settings: HeaderSettings,
    sanitize: (data: IBlockData['data']): IBlockData<IHeaderData>['data'] => {
      return { text: data.text, level: data.level, alignment: data.alignment };
    },
    block: Header,
  },
  image: {
    toolbar: {
      text: 'Rasm',
      icon: IconPicture,
    },
    settings: ImageSettings,
    sanitize: (data: IBlockData['data']): IBlockData<IImageData>['data'] => {
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
    initialData: { items: [''], style: 'unordered' } satisfies IListData,
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
