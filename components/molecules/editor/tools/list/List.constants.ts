import { IconListBulleted } from '@codexteam/icons';

import { ITool } from '../tool.types';
import { ListSettings } from './List.settings';
import { List } from './List.tool';
import { IListData } from './List.types';

export const ListTool: ITool = {
  toolbar: {
    text: "Ro'yxat",
    icon: IconListBulleted,
  },
  block: List,
  settings: ListSettings,
  initialData: { items: [''], style: 'unordered' } satisfies IListData,
  inlineToolEnabled: true,
  tags: ['ol', 'ul'],
};
