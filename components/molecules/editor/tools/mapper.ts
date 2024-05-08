import {
  IconBrackets,
  IconDelimiter,
  IconListBulleted,
  IconPicture,
  IconQuote,
  IconTable,
  IconWarning,
} from '@codexteam/icons';

import { IBlockData } from '../instance/Editor.types';
import { Alert, AlertSettings, IAlertData } from './alert';
import { Code } from './code/Code.tool';
import { Delimiter } from './delimiter/Delimiter.tools';
import { HeaderTool } from './header/Header.constants';
import { Image, ImageSettings } from './image';
import { IImageData } from './image/Image.types';
import { List, ListSettings } from './list';
import { IListData } from './list/List.types';
import { ParagraphTool } from './paragraph/Paragraph.constants';
import { Quote } from './quote';
import { defaultTableData, ITableData, Table } from './table';
import { TToolsMapper } from './tool.types';
import { Unsplash } from './unsplash/Unsplash.tool';

export const EDITOR_TOOLS: TToolsMapper = {
  paragraph: ParagraphTool,
  header: HeaderTool,
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
    tags: ['picture'],
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
    tags: ['picture'],
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
    inlineToolEnabled: true,
    tags: ['ol', 'ul'],
  },
  alert: {
    toolbar: {
      text: 'Ogohlantiruvchi',
      icon: IconWarning,
    },
    initialData: { message: '', type: 'info' } satisfies IAlertData,
    settings: AlertSettings,
    block: Alert,
    inlineToolEnabled: true,
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
    initialData: defaultTableData satisfies ITableData,
    block: Table,
    inlineToolEnabled: true,
    tags: ['table'],
  },
} as const;
