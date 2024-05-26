import { IconHeading } from '@codexteam/icons';

import { IBlockData } from '../../instance/Editor.types';
import { ITool, TShortcuts } from '../tool.types';
import { HeaderSettings } from './Header.settings';
import { Header } from './Header.tool';
import { IHeaderData } from './Header.types';

export const HeaderTool: ITool = {
  toolbar: {
    text: 'Sarlavha',
    icon: IconHeading,
  },
  settings: HeaderSettings,
  shortcuts: [
    {
      key: '1',
      data: { text: '', level: 1 },
    },
    {
      key: '2',
      data: { text: '', level: 2 },
    },
    {
      key: '3',
      data: { text: '', level: 3 },
    },
    {
      key: '4',
      data: { text: '', level: 4 },
    },
    {
      key: '5',
      data: { text: '', level: 5 },
    },
    {
      key: '6',
      data: { text: '', level: 6 },
    },
  ] satisfies TShortcuts<IHeaderData>,
  sanitize: (data: IBlockData['data']): IBlockData<IHeaderData>['data'] => {
    return { text: data.text, level: data.level, alignment: data.alignment };
  },
  block: Header,
  inlineToolEnabled: true,
  tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  onPaste: (node) => {
    const heading = node as HTMLHeadingElement;
    const level = heading.localName.at(-1);

    return {
      text: heading.innerHTML,
      level: Number(level) as IHeaderData['level'],
    } satisfies IBlockData<IHeaderData>['data'];
  },
};
