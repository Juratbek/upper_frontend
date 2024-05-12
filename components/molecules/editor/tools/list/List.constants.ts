import { IconListBulleted } from '@codexteam/icons';

import { IBlockData } from '../../instance/Editor.types';
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
  onPaste: (node) => {
    const listElement = node as HTMLOListElement;
    const style: IListData['style'] = listElement.nodeName === 'OL' ? 'ordered' : 'unordered';

    const liElements = Array.from(listElement.querySelectorAll('li')) ?? [];
    const items = liElements.map((li) => li.innerHTML);

    return { items, style } satisfies IBlockData<IListData>['data'];
  },
};
